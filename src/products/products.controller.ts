import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  getAll() {
    return this.productsService.getAllProduct();
  }

  @Get('category/:id')
  getProductsByIdCategory(@Param("id") id: string){
    return this.productsService.getByIdCategory(+id)
  }

  @Post()
  create(@Body() createProduct: CreateProductDto) {
    return this.productsService.createProduct(createProduct);
  }
}
