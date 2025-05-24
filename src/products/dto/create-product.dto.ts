import { IsNotEmpty, IsNumber, IsString, IsOptional } from 'class-validator';

export class CreateProductDto {
    @IsNotEmpty()
    @IsString()
    name: string;
  
    @IsOptional()
    @IsString()
    description: string;
  
    @IsOptional()
    @IsString()
    imgUrl?: string;
  
    @IsNotEmpty()
    price: number;
  
    @IsNotEmpty()
    @IsNumber()
    categoryId: number; 
  }