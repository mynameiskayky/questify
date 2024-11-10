import { IsOptional, IsString, IsNumber, IsBoolean } from 'class-validator';
import { OmitType, PartialType } from '@nestjs/mapped-types';
import { CreateTaskDto } from './create-task.dto';

export class UpdateTaskDto extends PartialType(
  OmitType(CreateTaskDto, [] as const),
) {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsNumber()
  points?: number;

  @IsOptional()
  @IsBoolean()
  completed?: boolean;
}
