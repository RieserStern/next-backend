import { PartialType } from '@nestjs/swagger';
import {
  Min,
  IsString,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsUrl,
} from 'class-validator';

export class CreateCategoriesDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsUrl()
  @IsNotEmpty()
  readonly image: string;
}

export class UpdateCategoriesDto extends PartialType(CreateCategoriesDto) {}

export class FilterCategoriesDto {
  @IsOptional()
  @IsPositive()
  limit: number;
  @IsOptional()
  @Min(0)
  offset: number;
}
