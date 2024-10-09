import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';
import { Category } from 'src/categories/entities/category.entity';

export class CreateProductDto {
  @IsString()
  @ApiProperty({
    description: 'Nombre del producto',
    example: 'Logitech MX',
  })
  name: string;

  @IsString()
  @ApiProperty({
    description: 'Descripción del producto',
    example: 'The best keyboard in the world',
  })
  description: string;

  @IsNumber()
  @ApiProperty({
    description: 'Precio del producto',
    example: 149.99,
  })
  price: number;

  @IsNumber()
  @ApiProperty({
    description: 'Stock del producto',
    example: 10,
  })
  stock: number;

  @IsString()
  @ApiProperty({
    description: 'URL de la imagen del producto',
    example: 'https://example.com/image.png',
  })
  imgUrl: string;

  @IsString()
  @ApiProperty({
    description: 'Categoría del producto',
    example: 'keyboard',
  })
  category: string;
}
