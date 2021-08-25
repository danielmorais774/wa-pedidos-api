import { Injectable } from '@nestjs/common';
import { IPaginationParams } from 'modules/common/interfaces/pagination';
import { IOrder } from 'modules/database/interfaces/order';
import { Order } from 'modules/database/models/order';
import { Page, Transaction } from 'objection';

interface IListProps {
  paginationParams: IPaginationParams;
  userId?: number;
}

@Injectable()
export class OrderRepository {
  public async list(params: IListProps, transaction?: Transaction): Promise<Page<Order>> {
    let query = Order.query(transaction)
      .select('*')
      .page(params.paginationParams.page, params.paginationParams.pageSize);

    if (params.paginationParams.orderBy) {
      query = query.orderBy(params.paginationParams.orderBy, params.paginationParams.orderDirection);
    }

    if (params.userId) {
      query = query.where('userId', params.userId);
    }

    return query;
  }

  public async findById(id: number, transaction?: Transaction): Promise<Order> {
    return Order.query(transaction)
      .where({ id })
      .first();
  }

  public async insert(model: IOrder, transaction?: Transaction): Promise<Order> {
    return Order.query(transaction).insert(model);
  }
}
