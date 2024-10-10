import { ApiProperty } from '@nestjs/swagger';
import { ArrayMinSize, IsArray, IsNotEmpty, IsUUID } from 'class-validator';
import { Product } from 'src/products/product.entity';

export class CreateOrderDto {
  @IsNotEmpty()
  @IsUUID()
  @ApiProperty({
    description: 'User ID',
    example: 'e8f5ac19-b1af-4529-bb40-8a1795880632',
  })
  user_id: string;

  @IsArray()
  @ArrayMinSize(1)
  @ApiProperty({
    description: 'List of products',
    example: `[
     {"id":"39667e43-4ca2-4863-ba1b-eb740e5277d2"},
     {"id":"c62b185f-ddd2-436c-911f-72e4e9a31b14"}
    ]`,
  })
  products: Partial<Product[]>;
}
