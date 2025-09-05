import { DataSource } from 'typeorm';


import * as dotenv from 'dotenv';
import { Product } from 'src/entities/product.entities';
import { Category } from 'src/entities/category.entities';
import { Order, OrderItem } from 'src/entities/order.entities';

dotenv.config();

export const AppDataSource = new DataSource({
  type: 'postgres',
  url: process.env.DATABASE_URL,
  entities: [Product, Category, Order, OrderItem],
  migrations: ['src/migrations/*{.ts,.js}'],
  ssl: { rejectUnauthorized: false },
});