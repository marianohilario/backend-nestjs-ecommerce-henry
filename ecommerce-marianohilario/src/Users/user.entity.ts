import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { Order } from '../orders/entities/order.entity';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 50, unique: true, nullable: false })
  email: string;

  @Column({ type: 'varchar', length: 50, nullable: false })
  name: string;

  @Column({ type: 'varchar', nullable: false })
  password: string;

  @Column({ type: 'text', nullable: true })
  address: string;

  @Column({ type: 'int', nullable: true })
  phone: number;

  @Column({ type: 'varchar', length: 50, nullable: true })
  country?: string | undefined;

  @Column({ type: 'varchar', length: 50, nullable: true })
  city?: string | undefined;

  @Column({ type: 'boolean', default: false })
  isAdmin: boolean;

  @OneToMany(() => Order, (order) => order.user)
  orders: Order[];
}
