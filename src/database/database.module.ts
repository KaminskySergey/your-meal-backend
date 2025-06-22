import { Module } from '@nestjs/common';
import { DatabaseService } from './database.service';
import { DatabaseController } from './database.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from '../entities/category.entities';
import { Product } from '../entities/product.entities';
import { Order, OrderItem } from '../entities/order.entities';

@Module({
  imports: [TypeOrmModule.forFeature([Category, Product, Order, OrderItem])],
  controllers: [DatabaseController],
  providers: [DatabaseService],
})
export class DatabaseModule {}
