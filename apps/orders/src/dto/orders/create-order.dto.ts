import {LocationDTO} from "../users/location.dto";
import {PackageDTO} from "./package.dto";

export interface CreateOrderDTO {
    dropoff: LocationDTO;
    pickup: LocationDTO;
    packages: PackageDTO[];
}
