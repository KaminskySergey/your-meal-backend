import { Body, Controller, Get, Post } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  getAll() {
    return this.categoryService.getAllCategory();
  }

  @Post()
  create(@Body() createCategory: CreateCategoryDto) {
    return this.categoryService.createCategory(createCategory);
  }
}
