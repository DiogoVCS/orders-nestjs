import {Module} from "@nestjs/common";
import {InfrastructureModule} from "../infrastructure/infrastructure.module";
import {DomainModule} from "../domain/domain.module";
import {OrdersService} from "./orders/orders.service";
import {OrderMapper} from "./orders/order.mapper";
import {UserMapper} from "./user/user.mapper";
import {LocationMapper} from "./user/location.mapper";
import {UserService} from "./user/user.service";

@Module({
    imports: [
        InfrastructureModule,
        DomainModule,
    ],
    providers: [OrdersService, OrderMapper, UserMapper, LocationMapper, UserService],
    exports: [OrdersService]
})
export class ServicesModule {
}
