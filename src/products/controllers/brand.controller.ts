import {
  Controller,
  Param,
  Body,
  Get,
  Post,
  Put,
  Delete,
  NotFoundException,
} from '@nestjs/common';
import { CreateBrandDto, UpdateBrandDto } from '../dtos/brand.dto';
import { BrandService } from '../services/brand.service';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { MongoIdPipe } from 'src/common/mongo-id.pipe';

@ApiTags('brand')
@Controller('brand')
export class BrandController {
  constructor(private brandService: BrandService) {}

  @Get()
  @ApiOperation({ summary: 'List of brands' })
  getBrands() {
    return this.brandService.getAll();
  }

  @Get(':id')
  getBrand(@Param('id', MongoIdPipe) id: string) {
    return this.brandService.getOne(id);
  }

  @Post()
  createBrand(@Body() payload: CreateBrandDto) {
    return this.brandService.createOne(payload);
  }

  @Put(':id')
  updateBrand(
    @Param('id', MongoIdPipe) id: string,
    @Body() payload: UpdateBrandDto,
  ) {
    return this.brandService.updateOne(id, payload);
  }

  @Delete(':id')
  deleteBrand(@Param('id', MongoIdPipe) id: string) {
    return this.brandService.deleteOne(id);
  }
}
