import {
  IsString,
  IsUrl,
  IsNotEmpty,
  IsPositive,
  IsOptional,
  Min,
} from 'class-validator';
import { PartialType } from '@nestjs/swagger';

export class CreateBrandDto {
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsString()
  @IsUrl()
  @IsNotEmpty()
  image: string;
}

export class UpdateBrandDto extends PartialType(CreateBrandDto) {}

export class FilterBrandDto {
  @IsOptional()
  @IsPositive()
  limit: number;
  @IsOptional()
  @Min(0)
  offset: string;
}
