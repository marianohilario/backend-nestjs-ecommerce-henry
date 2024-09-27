import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Order } from '../../orders/entities/order.entity';
import { Product } from '../../products/product.entity';

@Entity({ name: 'orders_detail' })
export class OrdersDetail {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    nullable: false,
  })
  price: number;

  @OneToOne(() => Order, (order) => order.orderDetail)
  @JoinColumn({ name: 'order_id' })
  order: Order;

  @ManyToMany(() => Product, (product) => product.orderDetails)
  products: Product[];
}
