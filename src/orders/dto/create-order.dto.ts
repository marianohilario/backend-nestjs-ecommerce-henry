import { ApiProperty } from '@nestjs/swagger';
import { ArrayMinSize, IsArray, IsNotEmpty, IsUUID } from 'class-validator';
import { Product } from 'src/products/product.entity';

export class CreateOrderDto {
  @IsNotEmpty()
  @IsUUID()
  @ApiProperty({
    description: 'User ID',
    example: '01c0557b-e2b1-4a89-9aa9-92296c045088',
  })
  user_id: string;

  @IsArray()
  @ArrayMinSize(1)
  @ApiProperty({
    description: 'List of products',
    example: `[
     {"id":"ac9af5f7-2c54-45ac-b7ec-4b7d3400ea61"},
     {"id":"080e87ed-2299-4590-8cc1-11c2c7883c23"}
    ]`,
  })
  products: Partial<Product[]>;
}
