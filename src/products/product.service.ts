import { Injectable } from '@nestjs/common';
import { ProductsRepository } from './product.repository';
import { Product } from './product.entity';
import { CreateProductDto } from './dtos/create-product.dto';

@Injectable()
export class ProductsServices {
  constructor(private productsRepository: ProductsRepository) {}

  getProducts(page: number, limit: number): Promise<Product[]> {
    return this.productsRepository.getProducts(page, limit);
  }

  getProductById(id: string): Promise<Product> {
    return this.productsRepository.getProductById(id);
  }

  getProductByName(name: string): Promise<Product[]> {
    return this.productsRepository.getProductByName(name);
  }

  createProduct(productData: CreateProductDto) {
    return this.productsRepository.createProduct(productData);
  }

  addProducts(): Promise<string> {
    return this.productsRepository.addProducts();
  }

  updateProduct(id: string, dataToUpdate: Partial<Product>): Promise<Product> {
    return this.productsRepository.updateProduct(id, dataToUpdate);
  }

  deleteProduct(id: string): Promise<string> {
    return this.productsRepository.deleteProduct(id);
  }
}
