import {Body, Controller, Get, Param, Post, Put, Query} from '@nestjs/common';
import {OrdersService} from "../../services/orders/orders.service";
import {CreateOrderDTO} from "../../dto/orders/create-order.dto";
import {UpdateStateDTO} from "../../dto/orders/update-state.dto";


@Controller("orders")
export class OrdersController {

    constructor(private readonly ordersService: OrdersService) {
    }

    @Post()
    createOrder(@Body() dto: CreateOrderDTO) {
        return this.ordersService.createOrder(dto)
    }

    @Get()
    getOrders(@Query('address') address, @Query('zip-code') zipCode) {
        return this.ordersService.getOrders({zipCode, address})
    }

    @Put("/:id/status")
    updateOrderStatus(@Param('id') id: string, @Body() dto: UpdateStateDTO) {
        return this.ordersService.updateOrderStatus(id, dto)
    }
}
