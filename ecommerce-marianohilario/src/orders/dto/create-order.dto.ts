import { Product } from 'src/Products/product.entity';

export class CreateOrderDto {
  user_id: string;

  products: Partial<Product[]>;
}
