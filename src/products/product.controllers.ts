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
import {
  ApiBearerAuth,
  ApiBody,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateProductDto } from './dtos/create-product.dto';

@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productService: ProductsServices) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiQuery({
    name: 'page',
    required: false,
    description: 'Page number to display.',
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    description: 'Number of users to display per page',
  })
  @ApiResponse({
    status: 200,
    description: 'Products retrieved successfully',
    schema: {
      example: [
        {
          id: 'ac9af5f7-2c54-45ac-b7ec-4b7d3400ea61',
          name: 'Iphone 15',
          description: 'The best smartphone in the world',
          price: '199.99',
          stock: 12,
          imgUrl: 'default-image-url.jpg',
        },
        {
          id: '080e87ed-2299-4590-8cc1-11c2c7883c23',
          name: 'Samsung Galaxy S23',
          description: 'The best smartphone in the world',
          price: '150.00',
          stock: 12,
          imgUrl: 'default-image-url.jpg',
        },
      ],
    },
  })
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
  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    description: 'Products seeded successfully',
    schema: { example: 'Products seeded successfully' },
  })
  @ApiResponse({
    status: 409,
    description: 'Conflict! There are no categories loaded.',
  })
  @ApiResponse({
    status: 400,
    description: 'Conflict! There are no products to seed.',
  })
  @ApiResponse({
    status: 401,
    description: 'Missing or not authorized token.',
  })
  addProducts(): Promise<string> {
    return this.productService.addProducts();
  }

  @Get('byname')
  @ApiQuery({
    name: 'name',
    required: true,
    description: 'Product name (or part of it) to display.',
    example: 'Iphone',
  })
  @ApiResponse({
    status: 200,
    description: 'Products retrieved successfully',
    schema: {
      example: [
        {
          id: 'ac9af5f7-2c54-45ac-b7ec-4b7d3400ea61',
          name: 'Iphone 15',
          description: 'The best smartphone in the world',
          price: '199.99',
          stock: 10,
          imgUrl:
            'https://acdn.mitiendanube.com/stores/018/676/products/nuevas-fotos-31-06c7fe99f200ecd17716643124687169-1024-1024.jpg',
          category: {
            id: '1355a536-3167-4a9f-a51b-daa4a75b6149',
            name: 'smartphone',
          },
        },
      ],
    },
  })
  @ApiResponse({
    status: 404,
    description: 'Product not found',
    schema: {
      example: {
        message: 'Product name does not exists.',
        error: 'Not Found',
        statusCode: 404,
      },
    },
  })
  getProductByName(@Query('name') name: string): Promise<Product[]> {
    return this.productService.getProductByName(name);
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiParam({
    name: 'id',
    type: 'string',
    description: 'Product ID',
    example: '39667e43-4ca2-4863-ba1b-eb740e5277d2',
  })
  @ApiResponse({
    status: 200,
    description: 'Product retrieved successfully',
    schema: {
      example: {
        id: 'e9867e2f-2905-48f3-ba29-aa5cfd1128f8',
        name: 'Iphone 15',
        description: 'The best smartphone in the world',
        price: '199.99',
        stock: 12,
        imgUrl: 'default-image-url.jpg',
      },
    },
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({
    status: 404,
    description: 'Product not found',
    schema: {
      example: {
        message: 'Product id does not exists.',
        error: 'Not Found',
        statusCode: 404,
      },
    },
  })
  getProductById(@Param('id', ParseUUIDPipe) id: string): Promise<Product> {
    return this.productService.getProductById(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiBearerAuth()
  @ApiResponse({
    status: 201,
    description: 'Product created successfully',
    schema: {
      example: {
        name: 'Logitech MX',
        description: 'The best keyboard in the world',
        price: 149.99,
        stock: 10,
        imgUrl: 'https://example.com/image.png',
        category: {
          id: 'b76c8703-6b90-4fd2-9ebc-b9ce074d96fe',
          name: 'keyboard',
        },
        id: 'ed95efb8-2f88-44c1-8ca0-be40ef3008d7',
      },
    },
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({
    status: 401,
    description: 'Missing or not authorized token.',
  })
  @ApiResponse({
    status: 404,
    description: 'Category not found.',
  })
  @ApiResponse({
    status: 409,
    description: 'Conflict! Product already exists.',
  })
  @UseGuards(AuthGuard)
  createProduct(@Body() productData: CreateProductDto) {
    if (validateProductData(productData, true)) {
      return this.productService.createProduct(productData);
    } else {
      return 'Invalid product';
    }
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  @ApiParam({
    name: 'id',
    type: 'string',
    description: 'Product ID',
    example: 'e9867e2f-2905-48f3-ba29-aa5cfd1128f8',
  })
  @ApiBody({
    description: 'Must contain at least one of the following fields:',
    type: UpdateProductDto,
  })
  @ApiResponse({
    status: 200,
    description: 'Returns the product updated.',
    schema: {
      example: {
        id: 'e9867e2f-2905-48f3-ba29-aa5cfd1128f8',
        name: 'Iphone 15',
        description: 'The best smartphone in the world',
        price: '199.99',
        stock: 10,
        imgUrl:
          'https://acdn.mitiendanube.com/stores/018/676/products/nuevas-fotos-31-06c7fe99f200ecd17716643124687169-1024-1024.jpg',
        category: {
          id: '1355a536-3167-4a9f-a51b-daa4a75b6149',
          name: 'smartphone',
        },
      },
    },
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Missing or not authorized token' })
  @ApiResponse({
    status: 404,
    description: 'Product not found',
    schema: {
      example: {
        message: 'Product id does not exists.',
        error: 'Not Found',
        statusCode: 404,
      },
    },
  })
  @ApiResponse({
    status: 409,
    description: 'Conflict! Product name already exists.',
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden! Only admins can perform this action.',
  })
  @ApiBearerAuth()
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

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @ApiParam({
    name: 'id',
    type: 'string',
    description: 'Product ID',
    example: 'ceaa691e-4c5e-4e20-8b5e-494719fe3c72',
  })
  @ApiResponse({
    status: 200,
    description: 'Product deleted successfully',
    schema: { example: 'Product deleted successfully' },
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Missing or not authorized token' })
  @ApiResponse({
    status: 404,
    description: 'Product not found',
    schema: {
      example: {
        message: 'Product id does not exists.',
        error: 'Not Found',
        statusCode: 404,
      },
    },
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden! Only admins can perform this action.',
  })
  @ApiBearerAuth()
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  @UseGuards(AuthGuard)
  deleteProduct(@Param('id') id: string) {
    return this.productService.deleteProduct(id);
  }
}
