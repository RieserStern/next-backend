import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, FilterQuery } from 'mongoose';

import {
  CreateProductDto,
  FilterProductsDto,
  UpdateProductDto,
} from '../dtos/products.dto';

import { Product } from '../entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>,
  ) {}

  async findAll(params?: FilterProductsDto) {
    const filters: FilterQuery<Product> = {};
    const { limit = 5, offset = 0 } = params;
    const { minPrice, maxPrice } = params;
    if (minPrice && maxPrice) {
      filters.price = { $gte: minPrice, $lte: maxPrice };
    }
    const [total, products] = await Promise.all([
      this.productModel.countDocuments(),
      this.productModel
        .find(filters)
        .populate('brand')
        .skip(offset * limit)
        .limit(limit)
        .exec(),
    ]);
    return { total, products };
  }

  async findOne(id: string) {
    const value = await this.productModel.findById(id).exec();
    if (!value) {
      throw new NotFoundException(`Product ${id} is not found`);
    }
    return {
      message: 'OK',
      payload: value,
    };
  }

  async createOne(data: CreateProductDto) {
    const newProduct = new this.productModel(data);
    return await newProduct.save();
  }

  async updateOne(id: string, changes: UpdateProductDto) {
    const product = await this.productModel
      .findByIdAndUpdate(id, { $set: changes }, { new: true })
      .exec();
    if (!product) {
      throw new NotFoundException(`Product #${id} not found`);
    }
    return product;
  }
  async deleteOne(id: string) {
    const product = await this.productModel.findByIdAndDelete(id);
    if (!product) {
      throw new NotFoundException(`Product #${id} not found`);
    }
    return product;
  }
}
