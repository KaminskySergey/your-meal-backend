import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsModule } from './products/products.module';
import { Product } from './entities/product.entities';
import { ConfigModule } from '@nestjs/config';
import { OrderModule } from './order/order.module';
import { CategoryModule } from './category/category.module';
import { Category } from './entities/category.entities';
import { Order, OrderItem } from './entities/order.entities';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'Kama060101555',
      database: 'your-meal',
      entities: [Product, Category, Order, OrderItem],
      synchronize: true,
    }),
    ProductsModule,
    OrderModule,
    CategoryModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
