import { Injectable } from '@nestjs/common';
import { ProductsRepository } from './product.repository';
import { Product } from './product.entity';

@Injectable()
export class ProductsServices {
  constructor(private productsRepository: ProductsRepository) {}
  async getProducts(): Promise<Product[]> {
    return await this.productsRepository.getProducts();
  }
}
