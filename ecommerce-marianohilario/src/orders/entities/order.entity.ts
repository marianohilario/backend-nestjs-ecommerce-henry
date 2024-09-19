import {
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { OrdersDetail } from '../../orders-details/entities/orders-detail.entity';
import { User } from '../../users/user.entity';

@Entity({ name: 'orders' })
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn({ type: 'timestamp' })
  date: Date;

  @ManyToOne(() => User, (user) => user.orders)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @OneToOne(() => OrdersDetail, (orderDetail) => orderDetail.order, {
    cascade: true,
  })
  orderDetail: OrdersDetail;
}
