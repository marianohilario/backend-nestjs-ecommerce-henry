import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Product } from './product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as data from '../utils/products.json';
import { Category } from 'src/categories/entities/category.entity';

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

  async addProducts(): Promise<string> {
    const categories = await this.categoryRepository.find();
    if (!categories || categories.length === 0)
      throw new HttpException(
        {
          error: 'No existen categorias cargadas.',
          description:
            'Primero realizar una petición GET al endpoint /categories/seeder',
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

      return 'Productos cargados';
    }
    return 'No hay productos para cargar';
  }

  async getProductById(id: string): Promise<Product> {
    return await this.productRepository.findOne({
      where: { id: id },
      relations: { category: true },
    });
  }

  async updateProduct(
    id: string,
    dataToUpdate: Partial<Product>,
  ): Promise<Product> {
    const productExist = await this.productRepository.findOne({
      where: { id },
    });
    if (!productExist) {
      throw new NotFoundException('El id de producto es inexistente');
    }

    await this.productRepository.update(id, dataToUpdate);
    return await this.productRepository.findOne({
      where: { id },
      relations: { category: true },
    });
  }
}
