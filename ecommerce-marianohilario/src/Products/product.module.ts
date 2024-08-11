import { Module } from '@nestjs/common';
import { ProductsController } from './product.controllers';
import { ProductsServices } from './product.service';

@Module({
  providers: [ProductsServices],
  controllers: [ProductsController],
})
export class ProductsModule {}
