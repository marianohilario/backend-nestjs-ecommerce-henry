import { ArrayMinSize, IsArray, IsNotEmpty, IsUUID } from 'class-validator';
import { Product } from 'src/Products/product.entity';

export class CreateOrderDto {
  @IsNotEmpty()
  @IsUUID()
  user_id: string;

  @IsArray()
  @ArrayMinSize(1)
  products: Partial<Product[]>;
}
