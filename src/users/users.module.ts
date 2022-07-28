import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersController } from './controllers/users.controller';
import { CustomerController } from './controllers/customer.controller';
import { UsersService } from './services/users.service';
import { CustomersService } from './services/customers.service';
import { ProductsModule } from 'src/products/products.module';
import { User, UserSchema } from './entities/user.entity';
import { Customer, CustomerSchema } from './entities/customer.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
      {
        name: Customer.name,
        schema: CustomerSchema,
      },
    ]),
    ProductsModule,
  ],
  controllers: [CustomerController, UsersController],
  providers: [UsersService, CustomersService],
})
export class UsersModule {}
