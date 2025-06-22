import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order, OrderItem } from '../entities/order.entities';
import { Product } from '../entities/product.entities';
import { Repository } from 'typeorm';
import { CreateOrderDto } from './dto/create-order.dto';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,

    @InjectRepository(OrderItem)
    private readonly orderItemRepository: Repository<OrderItem>,

    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  getAll(){
    return this.orderRepository.find({
        relations: ['items', 'items.product'],
      })
  }

  async createOrder(dto: CreateOrderDto) {
    const items: OrderItem[] = [];
    for (const item of dto.items) {
      const product = await this.productRepository.findOneBy({
        id: item.productId,
      });
      if (!product) {
        throw new NotFoundException(
          `Product with id ${item.productId} not found`,
        );
      }
      const orderItem = this.orderItemRepository.create({
        product,
        quantity: item.quantity,
      });
      console.log(orderItem);
      items.push(orderItem);
    }

    const order = this.orderRepository.create({
      name: dto.name,
      address: dto.address,
      phone: dto.phone,
      items,
    });
    console.log(order)

    const savedOrder = await this.orderRepository.save(order);
console.log(savedOrder)
    return savedOrder;
  }
}
