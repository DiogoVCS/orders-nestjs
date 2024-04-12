import {Module} from "@nestjs/common";
import {ServicesModule} from "../services/services.module";
import {OrdersController} from "./orders/orders.controller";

@Module({
    imports: [
        ServicesModule,
    ],
    controllers: [OrdersController],
})
export class ControllersModule {
}
