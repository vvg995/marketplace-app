/*
https://docs.nestjs.com/controllers#controllers
*/

import { Body, Controller, Delete, Get, Param, Post, Query } from '@nestjs/common';
import { MockOrder, OrdersService } from './orders.service';

@Controller("orders")
export class OrdersController {
    constructor(private readonly ordersService: OrdersService) {

    }
    @Get()
    getOrders() {
        this.ordersService.getOrders()
    }

    @Post()
    createOrder(@Body() order: Omit<MockOrder, "id">) {
        console.log(order)
        return this.ordersService.createOrder(order);
    }

    @Delete(":id")
    deleteOrder(@Param("id") id: string) {
        return this.ordersService.deleteOrder(Number(id));
    }
}
