import { IsString, IsPhoneNumber, IsNotEmpty, IsArray } from 'class-validator';
import { PartialType } from '@nestjs/swagger';

export class CreateCustomerDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  readonly lastName: string;

  @IsString()
  @IsPhoneNumber()
  readonly phone: string;

  @IsArray()
  @IsNotEmpty()
  readonly skills: any;
}

export class UpdateCustomerDto extends PartialType(CreateCustomerDto) {}
