import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ProductsServices } from './product.service';
import { Product } from './product.entity';
import { validateProductData } from '../utils/validate';
import { AuthGuard } from '../auth/guards/auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../decorators/roles.decorator';
import { Role } from '../auth/enum/roles.enum';
import { UpdateProductDto } from './dtos/update-product.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productService: ProductsServices) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  getProducts(
    @Query('page') page: string,
    @Query('limit') limit: string,
  ): Promise<Product[]> {
    if (page && limit) {
      return this.productService.getProducts(Number(page), Number(limit));
    }
    return this.productService.getProducts(1, 5);
  }

  @Get('seeder')
  addProducts(): Promise<string> {
    return this.productService.addProducts();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  getProductById(@Param('id', ParseUUIDPipe) id: string): Promise<Product> {
    return this.productService.getProductById(id);
  }

  // @Post()
  // @HttpCode(HttpStatus.CREATED)
  // @UseGuards(AuthGuard)
  // createProduct(@Body() productData: Product) {
  //   if (validateProductData(productData, true)) {
  //     return this.productService.createProduct(productData);
  //   } else {
  //     return 'Producto no valido';
  //   }
  // }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  updateProduct(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dataToUpdate: UpdateProductDto,
  ): Promise<Product> | string {
    if (validateProductData(dataToUpdate, false)) {
      return this.productService.updateProduct(id, dataToUpdate);
    } else {
      return 'Producto no valido';
    }
  }

  // @Delete(':id')
  // @HttpCode(HttpStatus.OK)
  // @UseGuards(AuthGuard)
  // deleteProduct(@Param('id') id: string) {
  //   return this.productService.deleteProduct(id);
  // }
}
