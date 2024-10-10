import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';

import { Order } from './entities/order.entity';
import { Product } from '../products/product.entity';
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
    if (!order) throw new NotFoundException('Order id does not exists');
    return order;
  }
  async addOrder(createOrderDto) {
      const { user_id, products } = createOrderDto;
    let total = 0;

    const user = await this.userRepository.findOne({ where: { id: user_id } });
    if (!user) throw new NotFoundException('User id does not exist');

    const productsArray = await Promise.all(
      products.map(async (element) => {
        const product = await this.productRepository.findOneBy({
          id: element.id,
        });
        if (!product) throw new NotFoundException('Product id does not exist');

        if (product.stock < 1) {
          throw new NotFoundException(
            `Product with id ${product.id} is out of stock`,
          );
        }

        total += Number(product.price);
        
        return product;
      }),
    );

    const newOrder = new Order();
    newOrder.user = user;
    const order = await this.orderRepository.save(newOrder);

    await Promise.all(
      productsArray.map(async (product) => {
        await this.productRepository.update(
          { id: product.id },
          { stock: product.stock - 1 },
        );
      }),
    );

    // Crear el detalle de la orden
    const newOrderDetail = new OrdersDetail();
    newOrderDetail.price = Number(Number(total).toFixed(2));
    newOrderDetail.products = productsArray;
    newOrderDetail.order = order;

    await this.ordersDetailRepository.save(newOrderDetail);

    // Retornar la orden completa
    return this.orderRepository.find({
      where: { id: order.id },
      relations: { orderDetail: true },
    });
  }
}
