import { Test, TestingModule } from '@nestjs/testing';
import { CategoriesService } from './categories.service';
import { CategoriesRepository } from './categories.repository';

describe('CategoriesService', () => {
  let categoriesService: CategoriesService;
  let mockCategoriesRepository: Partial<CategoriesRepository>;

  const mockCategory = {
    name: 'Smartphones',
  };

  beforeEach(async () => {
    mockCategoriesRepository = {
      getCategories: () =>
        Promise.resolve([{ ...mockCategory, id: '1', products: [] }]),
      addCategories: () => Promise.resolve('Categorías cargadas'),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CategoriesService,
        {
          provide: CategoriesRepository,
          useValue: mockCategoriesRepository,
        },
      ],
    }).compile();

    categoriesService = module.get<CategoriesService>(CategoriesService);
  });

  it('should be defined', () => {
    expect(categoriesService).toBeDefined();
  });

  it('getCategories() should return an array of categories', async () => {
    const categories = await categoriesService.getCategories();
    expect(categories).toEqual([
      { id: '1', name: 'Smartphones', products: [] },
    ]);
  });

  it('addCategories() should add categories to the database and return "Categorías cargadas"', async () => {
    const result = await categoriesService.addCategories();
    expect(result).toEqual('Categorías cargadas');
  });
});
