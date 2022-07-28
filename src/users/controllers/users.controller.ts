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
import { CreateUserDto, UpdateUserDto } from '../dtos/users.dto';
import { UsersService } from '../services/users.service';
import { ApiTags } from '@nestjs/swagger';
import { MongoIdPipe } from 'src/common/mongo-id.pipe';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}
  @Get()
  GetUsers() {
    return this.usersService.findAll();
  }

  @Get(':userId')
  GetUser(@Param('userId', MongoIdPipe) userId: string) {
    const value = this.usersService.findOne(userId);
    if (!value) {
      throw new NotFoundException(`User with id: ${userId} not exists`);
    }
    return value;
  }

  // @Get(':id/orders')
  // getOrders(@Param('id', ParseIntPipe) id: number) {
  //   return this.usersService.getOrders(id);
  // }

  @Post()
  createUser(@Body() payload: CreateUserDto) {
    return this.usersService.createOne(payload);
  }

  @Put(':id')
  updateUser(
    @Param('id', MongoIdPipe) id: string,
    @Body() payload: UpdateUserDto,
  ) {
    return this.usersService.updateOne(id, payload);
  }

  @Delete(':id')
  deleteUser(@Param('id', MongoIdPipe) id: string) {
    return this.usersService.deleteOne(id);
  }
}
