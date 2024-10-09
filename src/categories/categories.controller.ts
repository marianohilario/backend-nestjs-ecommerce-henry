import { Controller, Get, UseGuards } from '@nestjs/common';

import { CategoriesService } from './categories.service';
import { Category } from './entities/category.entity';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../auth/guards/auth.guard';

@ApiTags('Categories')
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get()
  @ApiResponse({
    status: 200,
    description: 'Get all categories',
    schema: {
      example: [
        {
          id: '1355a536-3167-4a9f-a51b-daa4a75b6149',
          name: 'smartphone',
        },
        {
          id: '8ca2a1ff-64ce-4531-8722-1b9f1d3b10e2',
          name: 'monitor',
        },
        {
          id: 'b76c8703-6b90-4fd2-9ebc-b9ce074d96fe',
          name: 'keyboard',
        },
        {
          id: '645093bc-6dda-46f1-9401-f134cfef1223',
          name: 'mouse',
        },
      ],
    },
  })
  getCategories(): Promise<Category[]> {
    return this.categoriesService.getCategories();
  }

  @Get('seeder')
  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    description: 'Add categories to the database',
    schema: {
      example: 'Categories seeded successfully',
    },
  })
  @ApiResponse({
    status: 409,
    description: 'Conflict! There are no categories to seed.',
  })
  @ApiResponse({
    status: 401,
    description: 'Missing or not authorized token.',
  })
  @UseGuards(AuthGuard)
  addCategories(): Promise<string> {
    return this.categoriesService.addCategories();
  }
}
