import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
  NotFoundException,
  Query,
  ParseIntPipe,
} from '@nestjs/common';
import { ProductsService } from '../services/products.service';
import {
  CreateProductDto,
  UpdateProductDto,
  FilterProductsDto,
} from '../dtos/products.dto';
import { ApiTags } from '@nestjs/swagger';
import { MongoIdPipe } from '../../common/mongo-id.pipe';

@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Get()
  getProducts(@Query() params: FilterProductsDto) {
    return this.productsService.findAll(params);
  }

  @Get(':productId')
  getProduct(@Param('productId', MongoIdPipe) productId: string) {
    return this.productsService.findOne(productId);
  }

  @Post()
  createProduct(@Body() payload: CreateProductDto) {
    const value = this.productsService.createOne(payload);
    if (!value) {
      throw new NotFoundException("Don't create a product");
    }
    return value;
  }

  @Put(':productId')
  updateProduct(
    @Param('productId', MongoIdPipe) productId: string,
    @Body() payload: UpdateProductDto,
  ) {
    const value = this.productsService.updateOne(productId, payload);
    return value;
  }

  @Delete(':productId')
  deleteProduct(@Param('productId', MongoIdPipe) productId: string) {
    return this.productsService.deleteOne(productId);
  }
}
