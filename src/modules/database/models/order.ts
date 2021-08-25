import { ApiProperty } from '@nestjs/swagger';
import { Model } from 'objection';

import { IOrder } from '../interfaces/order';

export class Order extends Model implements IOrder {
  @ApiProperty({ type: 'integer' })
  public id: number;
  @ApiProperty({ type: 'integer' })
  public description: string;
  @ApiProperty({ type: 'integer' })
  public qtd: number;
  @ApiProperty()
  public price: number;
  @ApiProperty()
  public userId: number;

  public static get tableName(): string {
    return 'Order';
  }

  public $formatJson(data: IOrder): IOrder {
    return data;
  }
}
