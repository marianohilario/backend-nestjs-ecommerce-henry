import { Controller, Get } from '@nestjs/common';

import { CategoriesService } from './categories.service';
import { Category } from './entities/category.entity';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get()
  getCategories(): Promise<Category[]> {
    return this.categoriesService.getCategories();
  }

  @Get('seeder')
  addCategories(): Promise<string> {
    return this.categoriesService.addCategories();
  }
}
