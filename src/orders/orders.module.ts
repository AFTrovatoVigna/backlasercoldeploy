import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderDetails } from './orderdetails.entity';
import { Orders } from './orders.entity';
import { Users } from 'src/users/users.entity';
import { Products } from 'src/Products/products.entity';
import { Cart } from 'src/cart/cart.entity';
import { CartService } from 'src/cart/cart.service';

@Module({
  imports: [TypeOrmModule.forFeature([OrderDetails, Orders, Users, Products, Cart])],
  controllers: [OrdersController],
  providers: [OrdersService, CartService],
})
export class OrdersModule {}
