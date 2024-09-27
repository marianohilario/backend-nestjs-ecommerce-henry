import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

import { Product } from '../../products/product.entity';

@Entity({ name: 'categories' })
export class Category {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 50, nullable: false })
  name: string;

  @OneToMany(() => Product, (product) => product.category)
  products: Product[];
}
