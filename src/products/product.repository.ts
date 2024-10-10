import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Product } from './product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import * as data from '../utils/products.json';
import { Category } from '../categories/entities/category.entity';
import { CreateProductDto } from './dtos/create-product.dto';

@Injectable()
export class ProductsRepository {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async getProducts(page: number, limit: number): Promise<Product[]> {
    const offset = (page - 1) * limit;
    // Lo comentado funciona pero quise probar el queryBuilder
    // return await this.productRepository.find({
    //   relations: { category: true },
    //   where: { stock: MoreThan(0) },
    //   skip: offset, // Número de registros a omitir
    //   take: limit, // Número de registros a traer
    // });

    return await this.productRepository
      .createQueryBuilder('prod')
      .leftJoinAndSelect('prod.category', 'category') // Relación con la tabla 'category'
      .where('prod.stock > :stock', { stock: 0 })
      .orderBy('prod.name', 'ASC')
      .skip(offset)
      .take(limit)
      .getMany();
  }

  async createProduct(productData: CreateProductDto) {
    const category = await this.categoryRepository.findOne({
      where: { name: productData.category },
    });

    if (!category) {
      throw new NotFoundException('Category does not exists');
    }

    const productExist = await this.productRepository.findOne({
      where: { name: productData.name },
    });

    if (productExist) {
      throw new HttpException('Product already exists', HttpStatus.CONFLICT);
    }

    const newProduct = { ...productData, category };
    await this.productRepository.create(newProduct);
    await this.productRepository.save(newProduct);
    return newProduct;
  }

  async addProducts(): Promise<string> {
    const categories = await this.categoryRepository.find();
    if (!categories || categories.length === 0)
      throw new HttpException(
        {
          error: 'There are no categories loaded.',
          description:
            'First make a GET request to the /categories/seeder endpoint',
        },
        HttpStatus.CONFLICT,
      );

    if (data) {
      for (const product of data) {
        const productExist = await this.productRepository.findOne({
          where: { name: product.name },
        });
        if (productExist) continue;

        const newProduct = new Product();
        newProduct.name = product.name;
        newProduct.description = product.description;
        newProduct.price = product.price;
        newProduct.stock = product.stock;
        newProduct.category = await this.categoryRepository.findOne({
          where: { name: product.category },
        });
        await this.productRepository.save(newProduct);
      }

      return 'Products seeded successfully';
    }
    throw new HttpException(
      {
        error: 'There are no products to seed.',
        description: 'First make sure you have a products.json file',
      },
      HttpStatus.CONFLICT,
    );
  }

  async getProductById(id: string): Promise<Product> {
    const productExist = await this.productRepository.findOne({
      where: { id },
    });

    if (!productExist) {
      throw new NotFoundException('Product id does not exists.');
    }
    return await this.productRepository.findOne({
      where: { id: id },
      relations: { category: true },
    });
  }

  async getProductByName(name: string): Promise<Product[]> {
    const products = await this.productRepository
      .createQueryBuilder('product')
      .where('LOWER(product.name) LIKE :name', {
        name: `%${name.toLowerCase()}%`,
      })
      .leftJoinAndSelect('product.category', 'category')
      .getMany();

    if (!products.length) {
      throw new NotFoundException('Product name does not exists.');
    }

    return products;
  }

  async updateProduct(
    id: string,
    dataToUpdate: Partial<Product>,
  ): Promise<Product> {
    const productExist = await this.productRepository.findOne({
      where: { id },
    });
    if (!productExist) {
      throw new NotFoundException('Product id does not exists.');
    }

    if (dataToUpdate.name) {
      const productNameExists = await this.productRepository.findOne({
        where: { name: dataToUpdate.name },
      });

      if (productNameExists) {
        throw new HttpException(
          'Product name already exists',
          HttpStatus.CONFLICT,
        );
      }
    }

    await this.productRepository.update(id, dataToUpdate);
    return await this.productRepository.findOne({
      where: { id },
      relations: { category: true },
    });
  }

  async deleteProduct(id: string): Promise<string> {
    const productExist = await this.productRepository.findOne({
      where: { id },
    });
    if (!productExist) {
      throw new NotFoundException('Product id does not exists.');
    }
    await this.productRepository.delete(id);
    return 'Product deleted successfully';
  }
}
