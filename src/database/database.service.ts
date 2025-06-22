import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from '../entities/category.entities';
import { Order, OrderItem } from '../entities/order.entities';
import { Product } from '../entities/product.entities';
import { Repository } from 'typeorm';

@Injectable()
export class DatabaseService {
  constructor(
    @InjectRepository(Category) private categoryRepo: Repository<Category>,
    @InjectRepository(Product) private productRepo: Repository<Product>,
    @InjectRepository(Order) private orderRepo: Repository<Order>,
    @InjectRepository(OrderItem) private orderItemRepo: Repository<OrderItem>,
  ) {}

  async clearDatabase() {
    await this.orderItemRepo.query(`TRUNCATE TABLE order_items CASCADE;`);
    await this.orderRepo.query(`TRUNCATE TABLE orders CASCADE;`);
    await this.productRepo.query(`TRUNCATE TABLE products CASCADE;`);
    await this.categoryRepo.query(`TRUNCATE TABLE categories CASCADE;`);
  }
}
