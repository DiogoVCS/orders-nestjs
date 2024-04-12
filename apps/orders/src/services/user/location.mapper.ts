import {Injectable} from "@nestjs/common";
import {LocationModel} from "../../infrastructure/schemas/user/location.schema";
import {Location} from "../../domain/users/location";

@Injectable()
export class LocationMapper {
    mapToDAO(location: Location): Omit<LocationModel, "_id"> {
        return {
            address: location.address,
            country: location.country,
            zipCode: location.zipCode,
            city: location.city
        }
    }
}
