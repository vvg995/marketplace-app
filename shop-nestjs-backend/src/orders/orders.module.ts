import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/auth/user.entity';
import { Order } from './order.entity';
import { OrderItem } from './order-item.entity';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';

@Module({
    imports: [TypeOrmModule.forFeature([User, Order, OrderItem])],
    controllers: [
        OrdersController, ],
    providers: [
        OrdersService, ],
})
export class OrdersModule {}
