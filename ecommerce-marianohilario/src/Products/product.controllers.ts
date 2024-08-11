import { Controller, Get } from '@nestjs/common';
import { ProductsServices } from './product.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productService: ProductsServices) {}

  @Get()
  getProducts() {
    return this.productService.getProducts();
  }
}
