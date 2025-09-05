// import { Module } from '@nestjs/common';
// import { AppController } from './app.controller';
// import { AppService } from './app.service';
// import { TypeOrmModule } from '@nestjs/typeorm';
// import { ProductsModule } from './products/products.module';
// import { Product } from './entities/product.entities';
// import { ConfigModule } from '@nestjs/config';
// import { OrderModule } from './order/order.module';
// import { CategoryModule } from './category/category.module';
// import { DatabaseModule } from './database/database.module';
// import { Category } from './entities/category.entities';
// import { Order, OrderItem } from './entities/order.entities';
// import { CloudinaryModule } from './cloudinary/cloudinary.module';

// @Module({
//   imports: [
//     ConfigModule.forRoot({
//       isGlobal: true,
//     }),
//     TypeOrmModule.forRoot({
//       type: 'postgres',
//       host: 'dpg-d1bt123e5dus73euj020-a.oregon-postgres.render.com',
//       port: 5432,
//       username: process.env.DB_USERNAME,
//       password: process.env.DB_PASSWORD,
//       database: process.env.DB_NAME,
//       entities: [Product, Category, Order, OrderItem],
//       synchronize: true,
//     }),
//     ProductsModule,
//     OrderModule,
//     CategoryModule,
//     CloudinaryModule,
//     DatabaseModule,
//   ],
//   controllers: [AppController],
//   providers: [AppService],
// })
// export class AppModule {}

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsModule } from './products/products.module';
import { Product } from './entities/product.entities';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { OrderModule } from './order/order.module';
import { CategoryModule } from './category/category.module';
import { Category } from './entities/category.entities';
import { Order, OrderItem } from './entities/order.entities';
import { CloudinaryService } from './cloudinary/cloudinary.service';
import { CloudinaryModule } from './cloudinary/cloudinary.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        url: configService.get<string>('DATABASE_URL'),
        entities: [Product, Category, Order, OrderItem],
        synchronize: false,
        ssl: {
          rejectUnauthorized: false,
        },
      }),
    }),
    ProductsModule,
    OrderModule,
    CategoryModule,
    CloudinaryModule,
  ],
  controllers: [AppController],
  providers: [AppService, CloudinaryService],
})
export class AppModule {}
