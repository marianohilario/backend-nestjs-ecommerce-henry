import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { OrdersRepository } from './orders.repository';

@Injectable()
export class OrdersService {
  constructor(private readonly orderRepository: OrdersRepository) {}
  addOrder(createOrderDto: CreateOrderDto) {
    return this.orderRepository.addOrder(createOrderDto);
  }

  getOrders() {
    return this.orderRepository.getOrders();
  }

  getOrder(id: string) {
    return this.orderRepository.getOrder(id);
  }
}
