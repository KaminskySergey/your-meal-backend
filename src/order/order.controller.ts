import { Body, Controller, Get, Post } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}
  
  @Get()
  getAllOrder(){
    return this.orderService.getAll()
  }

  @Post()
  create(@Body() data: CreateOrderDto) {
    return this.orderService.createOrder(data);
  }

}
