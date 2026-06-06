/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './order.entity';
import { User } from 'src/auth/user.entity';
import { Repository } from 'typeorm';

export interface MockOrder {
    id: number;
    name: string;
}

@Injectable()
export class OrdersService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        @InjectRepository(Order)
        private readonly orderRepository: Repository<Order>
    ) {}


    orderList: MockOrder[] = [];

    getOrders() {
        return this.orderList;
    }

    createOrder(order: Omit<MockOrder, "id">) {
        console.log("order", order)

        const newOrder: MockOrder = {
            ...order,
            id: this.orderList.length ? Math.max(...this.orderList.map(i => i.id)) + 1 : 0
        }
        this.orderList.push(newOrder);
        return this.orderList;
    }

    deleteOrder(orderId: number) {
        this.orderList = this.orderList.filter(i => i.id !== orderId);
        return this.orderList;
    }
}
