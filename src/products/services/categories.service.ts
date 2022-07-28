import { Injectable, NotFoundException } from '@nestjs/common';
import {
  CreateCategoriesDto,
  UpdateCategoriesDto,
} from '../dtos/categories.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Category } from '../entities/category.entity';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel(Category.name) private categoryModel: Model<Category>,
  ) {}

  findAll() {
    return this.categoryModel.find().exec();
  }

  findOne(name: string) {
    const value = this.categoryModel.find({ name }).exec();
    if (!value) {
      throw new NotFoundException('Not exists this categories');
    }
    return value;
  }

  async createOne(data: CreateCategoriesDto) {
    const newCategory = new this.categoryModel(data);
    return await newCategory.save();
  }

  updateOne(id: string, changes: UpdateCategoriesDto) {
    const value = this.categoryModel
      .findByIdAndUpdate(id, { $set: changes }, { new: true })
      .exec();
    if (!value) {
      throw new NotFoundException(`Category #${id} not found`);
    }
    return value;
  }

  deleteOne(id: string) {
    const value = this.categoryModel.findByIdAndDelete(id).exec();
    if (!value) {
      throw new NotFoundException(`Category #${id} not found`);
    }
    return value;
  }
}
