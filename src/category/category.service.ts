import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from 'src/entities/category.entities';
import { Repository } from 'typeorm';
import { CreateCategoryDto } from './dto/create-category.dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  getAllCategory(){
   return this.categoryRepository.find({
    relations: ['products']
   })
  }
  createCategory(createCategory: CreateCategoryDto){
    const caterory = this.categoryRepository.create(createCategory)
    return this.categoryRepository.save(caterory)
  }
}
