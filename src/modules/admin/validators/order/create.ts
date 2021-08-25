import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsNumber, IsString, MaxLength, Min, MinLength } from 'class-validator';
import { IOrder } from 'modules/database/interfaces/order';

export class CreateValidator implements IOrder {
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(250)
  @ApiProperty({ required: true, type: 'string', minLength: 3, maxLength: 250 })
  public description: string;

  @IsNotEmpty()
  @IsInt()
  @Min(1)
  @ApiProperty({ required: false, type: 'integer' })
  public qtd: number;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ required: true })
  public price: number;

  public userId: number;
}
