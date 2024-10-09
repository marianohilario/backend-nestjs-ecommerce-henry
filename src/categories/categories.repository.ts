import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Category } from './entities/category.entity';
import * as data from '../utils/products.json';
import { HttpException, HttpStatus } from '@nestjs/common';

export class CategoriesRepository {
  constructor(
    @InjectRepository(Category)
    private readonly categoriesRepository: Repository<Category>,
  ) {}

  async getCategories(): Promise<Category[]> {
    return await this.categoriesRepository.find();
  }

  async addCategories(): Promise<string> {
    if (data) {
      for (const element of data) {
        const categoryExist = await this.categoriesRepository.findOne({
          where: { name: element.category },
        });

        if (!categoryExist) {
          await this.categoriesRepository.save({ name: element.category });
        }
      }
      return 'Categories seeded successfully';
    }

    throw new HttpException(
      {
        error: 'There are no categories to seed.',
        description: 'First make sure you have a products.json file',
      },
      HttpStatus.CONFLICT,
    ); 
  }
}
