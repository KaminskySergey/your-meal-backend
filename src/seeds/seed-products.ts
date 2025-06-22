import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { DataSource } from 'typeorm';

import * as dotenv from 'dotenv';
import { Category } from '../entities/category.entities';
import { Product } from '../entities/product.entities';



dotenv.config();

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const dataSource = app.get(DataSource);

  const categoryRepo = dataSource.getRepository(Category);
  const productRepo = dataSource.getRepository(Product);

  const categoriesData = [
    {
      name: 'Burgers',
      products: [
        {
          name: 'Classic Cheeseburger',
          description: 'Juicy beef patty with cheddar, lettuce, tomato, and our special sauce.',
          price: 8.99,
          imgUrl: 'https://res.cloudinary.com/dmg6lkiux/image/upload/v1748162187/products/xgalxockb1kptf7t58cd.jpg'
        },
        {
          name: 'Bacon Burger',
          description: 'Burger with crispy bacon, pickles, and smoky BBQ sauce.',
          price: 9.99,
          imgUrl: 'https://res.cloudinary.com/dmg6lkiux/image/upload/v1748162074/products/uviaikkygw4m1n9thud1.jpg'
        },
        {
          name: 'Double Beef Burger',
          description: 'Two grilled patties, cheese, onions, and mustard.',
          price: 11.99,
          imgUrl: 'https://res.cloudinary.com/dmg6lkiux/image/upload/v1748162244/products/orwx1f80pdkuir0gdf7f.jpg'
        }
      ]
    },
    {
      name: 'Snacks',
      products: [
        {
          name: 'Fries',
          description: 'Golden crispy french fries with ketchup.',
          price: 3.99,
          imgUrl: 'https://res.cloudinary.com/dmg6lkiux/image/upload/v1748162318/products/cgugfnjvtylaxdmxodkp.jpg'
        },
        {
          name: 'Crispy Onion Rings',
          description: 'Crispy battered rings of sweet onion, deep-fried to golden perfection.',
          price: 4.49,
          imgUrl: 'https://res.cloudinary.com/dmg6lkiux/image/upload/v1748162594/products/nza4c5ezirbgjdjznbf0.jpg'
        },
        {
          name: 'Cheese Sticks',
          description: 'Crunchy mozzarella sticks with warm marinara dip.',
          price: 5.49,
          imgUrl: 'https://res.cloudinary.com/dmg6lkiux/image/upload/v1748162836/products/hnd06an6rrfbktykolwb.jpg'
        }
      ]
    },
    {
      name: 'Hot Dogs',
      products: [
        {
          name: 'Classic Hot Dog',
          description: 'Sausage in a bun with mustard and ketchup.',
          price: 4.99,
          imgUrl: 'https://res.cloudinary.com/dmg6lkiux/image/upload/v1748162712/products/gg95s9kssn41ferlslz7.jpg'
        },
        {
          name: 'Chili Dog',
          description: 'Hot dog topped with spicy beef chili and cheese.',
          price: 6.49,
          imgUrl: 'https://res.cloudinary.com/dmg6lkiux/image/upload/v1748162797/products/kpdkv0xl9syhvch1pfer.jpg'
        },
        {
          name: 'Bacon Cheese Dog',
          description: 'Hot dog with bacon bits and melted cheese.',
          price: 6.99,
          imgUrl: 'https://res.cloudinary.com/dmg6lkiux/image/upload/v1748162987/products/f9jp4rnryf2bausc1mrm.jpg'
        }
      ]
    },
    
    
    {
      name: 'Pizza',
      products: [
        {
          name: 'Margherita',
          description: 'Classic pizza with mozzarella and tomato.',
          price: 8.99,
          imgUrl: 'https://res.cloudinary.com/dmg6lkiux/image/upload/v1748163121/products/zqv5lfcsccohxis7xrkw.jpg'
        },
        {
          name: 'Pepperoni',
          description: 'Tomato sauce, cheese, and pepperoni.',
          price: 9.99,
          imgUrl: 'https://res.cloudinary.com/dmg6lkiux/image/upload/v1748163158/products/ksz2pvjwhvq7tkpybxoc.jpg'
        },
        {
          name: 'BBQ Chicken',
          description: 'Chicken pieces with BBQ sauce and red onions.',
          price: 10.49,
          imgUrl: 'https://res.cloudinary.com/dmg6lkiux/image/upload/v1748163182/products/dfkbufzhoxsurcvpz0e0.jpg'
        }
      ]
    },
    
    {
      name: 'Desserts',
      products: [
        {
          name: 'Chocolate Cake',
          description: 'Rich chocolate cake with frosting.',
          price: 5.49,
          imgUrl: 'https://res.cloudinary.com/dmg6lkiux/image/upload/v1748163236/products/l4n8d7ptle0hoxvzrjds.jpg'
        },
        {
          name: 'Ice Cream',
          description: 'Two scoops of vanilla and strawberry.',
          price: 3.99,
          imgUrl: 'https://res.cloudinary.com/dmg6lkiux/image/upload/v1748163293/products/aejw7oqlqufdyhm7vxtv.jpg'
        }
      ]
    },
    
  ];

  for (const categoryData of categoriesData) {
    const category = categoryRepo.create({ name: categoryData.name });
    await categoryRepo.save(category);

    const products = categoryData.products.map((product) => {
      return productRepo.create({
        ...product,
        category,
        categoryId: category.id
      });
    });

    await productRepo.save(products);
  }

  await app.close();
}

bootstrap();