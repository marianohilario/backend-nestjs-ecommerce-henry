import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Category } from './entities/category.entity';
import * as data from '../utils/products.json';

export class CategoriesRepository {
  constructor(
    @InjectRepository(Category)
    private readonly categoriesRepository: Repository<Category>,
  ) {}

  async getCategories(): Promise<Category[]> {
    return await this.categoriesRepository.find();
  }

  async addCategories(): Promise<string> {
    console.time('cat');
    if (data) {
      for (const element of data) {
        const categoryExist = await this.categoriesRepository.findOne({
          where: { name: element.category },
        });

        if (!categoryExist) {
          await this.categoriesRepository.save({ name: element.category });
        }
      }
      console.timeEnd('cat');
      return 'Categorías cargadas';
    }

    console.timeEnd('cat');
    return 'No existen categorías para cargar';
  }
}
