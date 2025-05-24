import { Entity,CreateDateColumn, UpdateDateColumn, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Product } from './product.entities';

@Entity('categories')
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Product, (product) => product.category)
  products: Product[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
