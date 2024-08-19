import { Module } from '@nestjs/common';
import { ProductsController } from './product.controllers';
import { ProductsServices } from './product.service';
import { ProductsRepository } from './product.repository';

@Module({
  providers: [ProductsServices, ProductsRepository],
  controllers: [ProductsController],
})
export class ProductsModule {}
