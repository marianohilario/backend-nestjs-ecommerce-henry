import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  ParseUUIDPipe,
  UseGuards,
  Req,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { AuthGuard } from '../auth/guards/auth.guard';
import { ApiBearerAuth, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { UserIdGuard } from '../auth/guards/user-id.guard';

@ApiTags('Orders')
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  @ApiBearerAuth()
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    schema: {
      example: [
        {
          id: '68bca4a1-800f-46b8-9f00-b6836352103f',
          date: '2024-10-09T16:32:34.551Z',
          orderDetail: {
            id: '7b91295c-310e-41fe-ab4e-92687af34a73',
            price: '349.99',
          },
        },
      ],
    },
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Missing or not authorized token' })
  @ApiResponse({
    status: 403,
    description:
      'Forbidden. When you try to create an order for a user with a different ID than the one who logged in.',
  })
  @UseGuards(AuthGuard, UserIdGuard)
  addOrder(@Body() createOrderDto: CreateOrderDto, @Req() req: Request | any) {
    console.log('Request:', req.user.id);
    return this.ordersService.addOrder(createOrderDto);
  }

  @Get()
  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    description: 'List of orders',
    schema: {
      example: [
        {
          id: '084692d1-8b58-483b-8e71-a36b49731739',
          date: '2024-09-18T22:33:40.060Z',
        },
        {
          id: '15aaae38-6b62-4d9d-95ca-e1db7af558b8',
          date: '2024-09-19T17:02:26.495Z',
        },
      ],
    },
  })
  @ApiResponse({ status: 401, description: 'Missing or not authorized token' })
  @UseGuards(AuthGuard)
  getOrders() {
    return this.ordersService.getOrders();
  }

  @Get(':id')
  @ApiBearerAuth()
  @ApiParam({
    name: 'id',
    type: String,
    description: 'Order ID',
    example: '9271adcf-2496-4939-8909-9599fa1822be',
  })
  @ApiResponse({
    status: 200,
    description: 'Returns the detail of an order.',
    schema: {
      example: {
        id: '9271adcf-2496-4939-8909-9599fa1822be',
        date: '2024-10-09T16:27:21.124Z',
        orderDetail: {
          id: '3897968a-6702-4884-8e93-5a848a00032a',
          price: '349.99',
          products: [
            {
              id: 'ac9af5f7-2c54-45ac-b7ec-4b7d3400ea61',
              name: 'Iphone 15',
              description: 'The best smartphone in the world',
              price: '199.99',
              stock: 94,
              imgUrl:
                'https://acdn.mitiendanube.com/stores/018/676/products/nuevas-fotos-31-06c7fe99f200ecd17716643124687169-1024-1024.jpg',
            },
            {
              id: '080e87ed-2299-4590-8cc1-11c2c7883c23',
              name: 'Samsung Galaxy S23',
              description: 'The best smartphone in the world',
              price: '150.00',
              stock: 6,
              imgUrl:
                'https://acdn.mitiendanube.com/stores/018/676/products/nuevas-fotos-31-06c7fe99f200ecd17716643124687169-1024-1024.jpg',
            },
          ],
        },
      },
    },
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Missing or not authorized token' })
  @UseGuards(AuthGuard)
  getOrder(@Param('id', ParseUUIDPipe) id: string) {
    return this.ordersService.getOrder(id);
  }
}
