import { Test, TestingModule } from '@nestjs/testing';
import { CategoriesController } from './categories.controller';
import { CategoriesService } from './categories.service';
import { AuthGuard } from '../auth/guards/auth.guard';

describe('CategoriesController', () => {
  let categoriesController: CategoriesController;
  let mockCategoriesService: Partial<CategoriesService>;

  const mockCategory = {
    name: 'Smartphones',
  };

  beforeEach(async () => {
    mockCategoriesService = {
      getCategories: () =>
        Promise.resolve([{ ...mockCategory, id: '1', products: [] }]),
      addCategories: () => Promise.resolve('Categorías cargadas'),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [CategoriesController],
      providers: [
        {
          provide: CategoriesService,
          useValue: mockCategoriesService,
        },
      ],
    })
      .overrideGuard(AuthGuard)
      .useValue({ canActivate: () => true })
      .compile();

    categoriesController =
      module.get<CategoriesController>(CategoriesController);
  });

  it('should be defined', () => {
    expect(categoriesController).toBeDefined();
  });

  it('getCategories() should return an array of categories', async () => {
    const categories = await categoriesController.getCategories();
    expect(categories).toEqual([
      { id: '1', name: 'Smartphones', products: [] },
    ]);
  });

  it('addCategories() should add categories to the database and return "Categorías cargadas"', async () => {
    const result = await categoriesController.addCategories();
    expect(result).toEqual('Categorías cargadas');
  });
});
