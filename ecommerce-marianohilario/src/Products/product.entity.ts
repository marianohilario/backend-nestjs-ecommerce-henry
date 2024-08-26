import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Category } from 'src/categories/entities/category.entity';
import { OrdersDetail } from 'src/orders-details/entities/orders-detail.entity';

@Entity({ name: 'products' })
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar',length: 50, nullable: false })
  name: string;

  @Column({ type: 'text', nullable: false })
  description: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
  price: number;

  @Column({ type: 'int', nullable: false })
  stock: number;

  @Column({ type: 'text', nullable: false, default: 'https://acdn.mitiendanube.com/stores/018/676/products/nuevas-fotos-31-06c7fe99f200ecd17716643124687169-1024-1024.jpg' })
  imgUrl: string;

  @ManyToOne(() => Category, (category) => category.products)
  @JoinColumn({ name: 'category_id' })
  category: Category;

  @ManyToMany(() => OrdersDetail, (orderDetail) => orderDetail.products)
  @JoinTable({ name: 'products-orders_detail' }) // Esta tabla intermedia es necesaria para la relación N:N
  orderDetails: OrdersDetail[];
}
