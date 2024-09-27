import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsOptional, IsString } from "class-validator";

export class UpdateProductDto {
    @IsString()
    @IsOptional()
    @ApiProperty({
        description: 'Nombre del producto',
        example: 'Razer BlackWidow V3'
    })
    name: string;

    @IsString()
    @IsOptional()
    @ApiProperty({
        description: 'Descripción del producto',
        example: 'The best keyboard in the world'
    })
    description: string;
    
    @IsNumber()
    @IsOptional()
    @ApiProperty({
        description: 'Precio del producto',
        example: 100.99
    })
    price: number;

    @IsNumber()
    @IsOptional()
    @ApiProperty({
        description: 'Stock del producto',
        example: 10
    })
    stock: number;

    @IsString()
    @IsOptional()
    @ApiProperty({
        description: 'URL de la imagen del producto',
        example: 'https://example.com/image.png'
    })
    imgUrl: string;
}