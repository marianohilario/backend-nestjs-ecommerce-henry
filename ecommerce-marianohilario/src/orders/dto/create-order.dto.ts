import { ApiProperty } from '@nestjs/swagger';
import { ArrayMinSize, IsArray, IsNotEmpty, IsUUID } from 'class-validator';
import { Product } from 'src/products/product.entity';

export class CreateOrderDto {
  @IsNotEmpty()
  @IsUUID()
  @ApiProperty({
    description: 'ID del usuario',
    example: '701ded1c-951c-451b-8f6f-f2f05079c7a4',
  })
  user_id: string;

  @IsArray()
  @ArrayMinSize(1)
  @ApiProperty({
    description: 'Listado de ID de productos comprados',
    example: `[
     {"id":"ceaa691e-4c5e-4e20-8b5e-494719fe3c7c"},
     {"id":"6bdb7c0d-523e-48e3-a42a-2070966e1224"}
    ]`,
  })
  products: Partial<Product[]>;
}
