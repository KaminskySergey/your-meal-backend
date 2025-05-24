import { Body, Controller, Get, Post } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  getAll() {
    return this.productsService.getAllProduct();
  }

  @Post()
  create(@Body() createProduct: CreateProductDto) {
    return this.productsService.createProduct(createProduct);
  }
}
