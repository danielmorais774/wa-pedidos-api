import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsOptional, IsString } from 'class-validator';
import { PaginationValidator } from 'modules/common/validators/pagination';

export class ListValidator extends PaginationValidator {
  @IsString()
  @IsOptional()
  @IsIn(['id', 'description', 'price', 'qtd'])
  @ApiProperty({ required: false, enum: ['id', 'description', 'price', 'qtd'] })
  public orderBy: string;
}
