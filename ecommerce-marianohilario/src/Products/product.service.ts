import { Injectable } from '@nestjs/common';

@Injectable()
export class ProductsServices {
  getProducts() {
    return 'Get all products';
  }
}
