import {Module} from '@nestjs/common';
import {ConfigModule} from "@nestjs/config";
import * as Joi from "joi";
import {ControllersModule} from "./controllers/controllers.module";

@Module({
    imports: [
        ControllersModule,
        ConfigModule.forRoot({
            isGlobal: true,
            validationSchema: Joi.object({
                MONGO_DB_URI: Joi.string().required()
            }),
            envFilePath: './apps/orders/.env'
        }),
    ],
})
export class AppModule {
}
