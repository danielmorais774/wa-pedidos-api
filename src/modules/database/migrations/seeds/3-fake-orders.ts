import * as Knex from 'knex';
import { IOrder } from 'modules/database/interfaces/order';
import { IS_DEV } from 'settings';

export async function seed(knex: Knex): Promise<any> {
  if (!IS_DEV) return;

  const orders = await knex
    .count()
    .from('Order')
    .first();

  if (Number(orders.count) !== 0) return;

  const order1: IOrder = {
    description: 'Lote de PS5',
    qtd: 100,
    price: 4500.99,
    userId: 1
  };

  const order2: IOrder = {
    description: 'Lote de PS4',
    qtd: 47,
    price: 2399.9,
    userId: 1
  };

  await knex.insert(order1).into('Order');
  await knex.insert(order2).into('Order');
}
