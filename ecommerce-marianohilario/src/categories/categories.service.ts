import { Injectable } from '@nestjs/common';

import { Category } from './entities/category.entity';
import { CategoriesRepository } from './categories.repository';

@Injectable()
export class CategoriesService {
  constructor(private readonly categoriesRepository: CategoriesRepository) {}
  getCategories(): Promise<Category[]> {
    return this.categoriesRepository.getCategories();
  }

  addCategories(): Promise<string> {
    return this.categoriesRepository.addCategories();
  }
}
