import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CreateUserDto, UpdateUserDto } from '../dtos/users.dto';
import { User } from '../entities/user.entity';
import { Order } from '../entities/order.entity';
import { ProductsService } from '../../products/services/products.service';
@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  findAll() {
    return this.userModel.find().exec();
  }
  async findOne(id: string) {
    const value = await this.userModel.findById(id).exec();
    if (!value) {
      throw new NotFoundException(`User with id: ${id} not exists`);
    }
    return value;
  }

  // async getOrders(id: string) {
  //   const user = this.findOne(id);
  //   if (!user) {
  //     throw new NotFoundException("Don't have orders");
  //   }
  //   return {
  //     date: new Date(),
  //     user,
  //     products: await this.productsService.findAll(),
  //   };
  // }

  async createOne(payload: CreateUserDto) {
    const newUser = new this.userModel(payload);
    return await newUser.save();
  }

  async updateOne(id: string, changes: UpdateUserDto) {
    const updateUser = await this.userModel
      .findByIdAndUpdate(id, { $set: changes }, { new: true })
      .exec();
    if (!updateUser) {
      throw new NotFoundException("User can't update profile");
    }
    return updateUser;
  }

  async deleteOne(id: string) {
    const user = await this.userModel.findByIdAndDelete(id).exec();
    if (!user) {
      throw new NotFoundException(`User #${id} not found`);
    }
    return 'This user is delete';
  }
}
