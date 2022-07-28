import {
  Controller,
  NotFoundException,
  Get,
  Post,
  Param,
  Body,
  Put,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { CustomersService } from '../services/customers.service';
import { CreateCustomerDto, UpdateCustomerDto } from '../dtos/customer.dto';
import { ApiTags } from '@nestjs/swagger';
import { MongoIdPipe } from 'src/common/mongo-id.pipe';

@ApiTags('customer')
@Controller('customer')
export class CustomerController {
  constructor(private customerService: CustomersService) {}

  @Get()
  getCustomers() {
    return this.customerService.findAll();
  }

  @Get(':id')
  getCustomer(@Param('id') id: string) {
    return this.customerService.findOne(id);
  }

  @Post()
  createCustomer(@Body() payload: CreateCustomerDto) {
    return this.customerService.createOne(payload);
  }

  @Put(':id')
  updateCustomer(
    @Param('id', MongoIdPipe) id: string,
    @Body() payload: UpdateCustomerDto,
  ) {
    return this.customerService.updateOne(id, payload);
  }

  @Delete(':id')
  deleteCustomer(@Param('id', MongoIdPipe) id: string) {
    return this.customerService.deleteOne(id);
  }
}
