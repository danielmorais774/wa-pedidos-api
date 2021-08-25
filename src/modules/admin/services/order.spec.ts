import { ForbiddenException } from '@nestjs/common';
import { IOrder } from 'modules/database/interfaces/order';

import { OrderRepository } from '../repositories/order';
import { OrderService } from './order';

/* eslint-disable max-len */
describe('Admin/UserService', () => {
  let orderRepository: OrderRepository;
  let service: OrderService;

  const order: IOrder = {
    description: 'Lote de PS5',
    qtd: 35,
    price: 4960.0,
    userId: 1
  };

  beforeEach(async () => {
    orderRepository = new OrderRepository();

    service = new OrderService(orderRepository);
  });

  it('should create a order', async () => {
    jest.spyOn(orderRepository, 'insert').mockImplementationOnce(order => Promise.resolve({ ...order } as any));
    const result = await service.create(order);

    expect(result).not.toBeFalsy();
    expect(result).toEqual(order);
  });

  it('should throw ForbiddenException with message authetication-required when try create a order with a invalid userId', async () => {
    try {
      await service.create({ ...order, userId: null });
      fail();
    } catch (err) {
      expect(err).toBeInstanceOf(ForbiddenException);
      expect(err.message.message).toBe('authetication required');
    }
  });
});
