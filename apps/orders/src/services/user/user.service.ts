import {Injectable} from "@nestjs/common";
import {UsersRepository} from "../../infrastructure/repositories/users/users.repository";
import {User} from "../../domain/users/user";
import {UserMapper} from "./user.mapper";

@Injectable()
export class UserService {

    constructor(private readonly repository: UsersRepository, private readonly mapper: UserMapper) {
    }

    async createUser(user: User) {
        const userDAO = this.mapper.mapToDAO(user)
        const created = await this.repository.create(userDAO)

        return created._id;
    }
}
