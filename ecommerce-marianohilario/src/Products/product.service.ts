import { Injectable } from '@nestjs/common';
import { ProductsRepository } from './product.repository';
import { Product } from './product.entity';

@Injectable()
export class ProductsServices {
  constructor(private productsRepository: ProductsRepository) {}
  async getProducts(page: number, limit: number): Promise<Product[]> {
    return await this.productsRepository.getProducts(page, limit);
  }
  async getProductById(id: string): Promise<Product> {
    return this.productsRepository.getProductById(id);
  }
  async createProduct(productData: Product): Promise<number> {
    return this.productsRepository.createProduct(productData);
  }

  async updateProduct(id: string, dataToUpdate: Product): Promise<number> {
    return this.productsRepository.updateProduct(id, dataToUpdate);
  }

  async deleteProduct(id: string): Promise<number> {
    return this.productsRepository.deleteProduct(id);
  }
}
