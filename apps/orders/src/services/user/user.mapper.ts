import {Injectable} from "@nestjs/common";
import {UserModel} from "../../infrastructure/schemas/user/user.schema";
import {User} from "../../domain/users/user";
import {LocationMapper} from "./location.mapper";
import {LocationModel} from "../../infrastructure/schemas/user/location.schema";
import {Location} from "../../domain/users/location";

@Injectable()
export class UserMapper {

    constructor(private readonly locationMapper: LocationMapper) {
    }


    mapToDAO(user: User): Omit<UserModel, "_id"> {
        return {
            email: user.email,
            name: user.name,
            location: this.locationMapper.mapToDAO(user.location) as LocationModel,
            phoneNumber: user.phoneNumber
        }
    }

    mapToDomain(userModel: UserModel): User {
        const location = new Location(userModel.location.address, userModel.location.city, userModel.location.country, userModel.location.zipCode)
        return new User(location, userModel.email, userModel.phoneNumber, userModel.name)
    }
}
