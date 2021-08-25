import { Controller, Get, Param, ParseIntPipe, Query, Body, Post } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthRequired, CurrentUser } from 'modules/common/guards/token';
import { ICurrentUser } from 'modules/common/interfaces/currentUser';
import { enRoles } from 'modules/database/interfaces/user';
import { Order } from 'modules/database/models/order';

import { OrderRepository } from '../repositories/order';
import { OrderService } from '../services/order';

import { CreateValidator } from '../validators/order/create';
import { ListValidator } from '../validators/order/list';

@ApiTags('Admin: Order')
@Controller('/order')
@AuthRequired([enRoles.admin])
export class OrderController {
  constructor(private orderRepository: OrderRepository, private orderService: OrderService) {}

  @Get()
  @ApiResponse({ status: 200, type: [Order] })
  public async list(@Query() model: ListValidator, @CurrentUser() currentUser: ICurrentUser) {
    const params = {
      paginationParams: model,
      userId: currentUser.id
    };
    return this.orderRepository.list(params);
  }

  @Get(':orderId')
  @ApiResponse({ status: 200, type: Order })
  public async details(@Param('orderId', ParseIntPipe) orderId: number) {
    return this.orderRepository.findById(orderId);
  }

  @Post()
  @ApiResponse({ status: 200, type: Order })
  public async create(@Body() model: CreateValidator, @CurrentUser() currentUser: ICurrentUser) {
    model.userId = currentUser.id;
    return this.orderService.create(model);
  }
}
