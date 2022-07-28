import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Brand } from '../entities/brand.entity';
import { CreateBrandDto, UpdateBrandDto } from '../dtos/brand.dto';

@Injectable()
export class BrandService {
  constructor(@InjectModel(Brand.name) private brandModel: Model<Brand>) {}

  getAll() {
    return this.brandModel.find().exec();
  }

  getOne(id: string) {
    const value = this.brandModel.findById(id).exec();
    if (!value) {
      throw new NotFoundException('Not exists this brand');
    }
    return value;
  }

  async createOne(payload: CreateBrandDto) {
    const newBrand = new this.brandModel(payload);
    return await newBrand.save();
  }

  async updateOne(id: string, changes: UpdateBrandDto) {
    const value = await this.brandModel
      .findByIdAndUpdate(id, { $set: changes }, { new: true })
      .exec();
    return value;
  }

  async deleteOne(id: string) {
    const value = await this.brandModel.findByIdAndDelete(id);
    if (!value) {
      throw new NotFoundException(`Brand #${id} not found`);
    }
    return value;
  }
}
