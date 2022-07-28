import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CreateCustomerDto, UpdateCustomerDto } from '../dtos/customer.dto';
import { Customer } from '../entities/customer.entity';

@Injectable()
export class CustomersService {
  constructor(
    @InjectModel(Customer.name) private customerModel: Model<Customer>,
  ) {}

  findAll() {
    return this.customerModel.find().exec();
  }

  async findOne(id: string) {
    const value = await this.customerModel.findById(id);
    if (!value) {
      throw new NotFoundException('customer not exists');
    }
    return value;
  }

  async createOne(data: CreateCustomerDto) {
    const newCustomer = new this.customerModel(data);
    return await newCustomer.save();
  }

  async updateOne(id: string, changes: UpdateCustomerDto) {
    const updateCustomer = await this.customerModel.findByIdAndUpdate(
      id,
      { $set: changes },
      { new: true },
    );
    if (!updateCustomer) {
      throw new NotFoundException('customer not exists');
    }
    return updateCustomer;
  }

  async deleteOne(id: string) {
    const customer = await this.customerModel.findByIdAndDelete(id).exec();
    if (!customer) {
      throw new NotFoundException('customer not exists');
    }
    return 'delete customer';
  }
}
