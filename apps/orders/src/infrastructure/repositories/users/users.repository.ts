import {Injectable, Logger} from "@nestjs/common";
import {AbstractRepository} from "../abstract.repository";
import {InjectConnection, InjectModel} from "@nestjs/mongoose";
import {Connection, Model} from "mongoose";
import {UserModel} from "../../schemas/user/user.schema";

@Injectable()
export class UsersRepository extends AbstractRepository<UserModel> {
    protected readonly logger = new Logger(UsersRepository.name)

    constructor(@InjectModel(UserModel.name) model: Model<UserModel>,
                @InjectConnection() connection: Connection) {
        super(model, connection)
    }
}
