import { Injectable, ForbiddenException } from '@nestjs/common';
import { IOrder } from 'modules/database/interfaces/order';
import { Order } from 'modules/database/models/order';
import { OrderRepository } from '../repositories/order';

@Injectable()
export class OrderService {
  constructor(private orderRepository: OrderRepository) {}

  public async create(model: IOrder): Promise<Order> {
    if (!model.userId) {
      throw new ForbiddenException('authetication required');
    }

    const user = await this.orderRepository.insert(model);

    return user;
  }
}
