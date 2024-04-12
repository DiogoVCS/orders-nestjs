import {Module} from "@nestjs/common";
import {MongooseModule} from "@nestjs/mongoose";
import {ConfigService} from "@nestjs/config";
import {OrdersRepository} from "./repositories/orders/orders.repository";
import {OrderModel, OrderSchema} from "./schemas/orders/order.schema";
import {UsersRepository} from "./repositories/users/users.repository";
import {UserModel, UserSchema} from "./schemas/user/user.schema";
import {PackageModel, PackageSchema} from "./schemas/orders/package.schema";
import {LocationModel, LocationSchema} from "./schemas/user/location.schema";

@Module({
    imports: [
        MongooseModule.forRootAsync({
            imports: [],
            useFactory: (configService: ConfigService) => ({
                uri: configService.get<string>('MONGO_DB_URI')
            }),
            inject: [ConfigService]
        }),
        MongooseModule.forFeature([
            {
                name: OrderModel.name, schema: OrderSchema
            },
            {
                name: UserModel.name, schema: UserSchema
            },
            {
                name: PackageModel.name, schema: PackageSchema
            },
            {
                name: LocationModel.name, schema: LocationSchema
            }
        ])
    ],
    providers: [OrdersRepository, UsersRepository],
    exports: [OrdersRepository, UsersRepository]
})
export class InfrastructureModule {
}
