import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ProductsServices } from './product.service';
import { Product } from './product.entity';
import { validateProductData } from 'src/Utils/validate';
import { AuthGuard } from 'src/Auth/auth.guard';

@Controller('products')
export class ProductsController {
  constructor(private readonly productService: ProductsServices) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  getProducts(@Query('page') page: string, @Query('limit') limit: string) {
    return this.productService.getProducts(Number(page), Number(limit));
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  getProductById(@Param('id') id: string) {
    return this.productService.getProductById(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(AuthGuard)
  createProduct(@Body() productData: Product) {
    if (validateProductData(productData, true)) {
      return this.productService.createProduct(productData);
    } else {
      return 'Producto no valido';
    }
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  updateProduct(@Param('id') id: string, @Body() dataToUpdate: Product) {
    if (validateProductData(dataToUpdate)) {
      return this.productService.updateProduct(id, dataToUpdate);
    } else {
      return 'Producto no valido';
    }
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  deleteProduct(@Param('id') id: string) {
    return this.productService.deleteProduct(id);
  }
}
