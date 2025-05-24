import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from 'src/entities/product.entities';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Category } from 'src/entities/category.entities';
import { CreateProductDto } from './dto/create-product.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,

    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  getAllProduct() {
    return this.productRepository.find();
  }

  async createProduct(createProduct: CreateProductDto) {
    const category = await this.categoryRepository.findOneBy({
      id: createProduct.categoryId,
    });
    if (!category) {
      throw new NotFoundException({
        statusCode: 404,
        message: 'Category not found',
        error: 'Not Found',
      });
    }

    const product = this.productRepository.create({
      name: createProduct.name,
      description: createProduct.description,
      imgUrl: createProduct.imgUrl,
      price: createProduct.price,
      categoryId: category.id,
    });

    return this.productRepository.save(product);
  }
}
