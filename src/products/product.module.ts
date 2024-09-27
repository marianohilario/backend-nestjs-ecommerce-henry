import { Module } from '@nestjs/common';
import { ProductsController } from './product.controllers';
import { ProductsServices } from './product.service';
import { ProductsRepository } from './product.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './product.entity';
import { CategoriesRepository } from '../categories/categories.repository';
import { Category } from '../categories/entities/category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Product, Category])],
  providers: [ProductsServices, ProductsRepository, CategoriesRepository],
  controllers: [ProductsController],
})
export class ProductsModule {}
