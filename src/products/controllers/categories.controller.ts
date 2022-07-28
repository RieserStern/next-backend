import {
  Controller,
  Get,
  Param,
  Body,
  Post,
  Put,
  Delete,
} from '@nestjs/common';

import { CategoriesService } from '../services/categories.service';
import {
  CreateCategoriesDto,
  UpdateCategoriesDto,
} from '../dtos/categories.dto';
import { ApiTags } from '@nestjs/swagger';
import { MongoIdPipe } from 'src/common/mongo-id.pipe';

@ApiTags('categories')
@Controller('categories')
export class CategoriesController {
  constructor(private categoriesService: CategoriesService) {}

  @Get()
  getCategories() {
    return this.categoriesService.findAll();
  }

  @Get(':id')
  getCategory(@Param('id') id: string) {
    return this.categoriesService.findOne(id);
  }

  @Post()
  createCategory(@Body() payload: CreateCategoriesDto) {
    return this.categoriesService.createOne(payload);
  }

  @Put(':id')
  updateCategory(
    @Param('id', MongoIdPipe) id: string,
    @Body() payload: UpdateCategoriesDto,
  ) {
    return this.categoriesService.updateOne(id, payload);
  }

  @Delete(':id')
  deleteCategory(@Param('id', MongoIdPipe) id: string) {
    return this.categoriesService.deleteOne(id);
  }
}
