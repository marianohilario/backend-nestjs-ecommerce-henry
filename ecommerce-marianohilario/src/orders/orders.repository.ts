import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';

import { Order } from './entities/order.entity';
import { Product } from '../Products/product.entity';
import { User } from '../users/user.entity';
import { OrdersDetail } from '../orders-details/entities/orders-detail.entity';

export class OrdersRepository {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(OrdersDetail)
    private readonly ordersDetailRepository: Repository<OrdersDetail>,
  ) {}

  async getOrders() {
    return this.orderRepository.find();
  }

  async getOrder(id: string): Promise<Order> {
    const order = await this.orderRepository.findOne({
      where: { id },
      relations: { orderDetail: { products: true } },
    });
    if (!order) throw new NotFoundException('ID de orden no encontrado');
    return order;
  }
  async addOrder(createOrderDto) {
    const { user_id, products } = createOrderDto;
    let total = 0;
    const user = await this.userRepository.findOne({ where: { id: user_id } });
    if (!user) throw new NotFoundException('ID de usuario no encontrado');

    const newOrder = new Order();
    newOrder.user = user;

    const order = await this.orderRepository.save(newOrder);

    const productsArray = await Promise.all(
      products.map(async (element) => {
        const product = await this.productRepository.findOneBy({
          id: element.id,
        });
        if (!product)
          throw new NotFoundException('El ID de producto no existe');

        total += Number(product.price);

        await this.productRepository.update(
          { id: element.id },
          { stock: product.stock - 1 },
        );

        return product;
      }),
    );

    const newOrderDetail = new OrdersDetail();

    newOrderDetail.price = Number(Number(total).toFixed(2));
    newOrderDetail.products = productsArray;
    newOrderDetail.order = order;

    await this.ordersDetailRepository.save(newOrderDetail);

    return this.orderRepository.find({
      where: { id: order.id },
      relations: { orderDetail: true },
    });
  }
}
