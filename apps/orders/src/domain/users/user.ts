import {Location} from "./location";

export class User {
    private readonly _location: Location
    private readonly _email: string;
    private readonly _phoneNumber: string;
    private readonly _name: string;

    constructor(readonly location: Location,
                readonly email: string,
                readonly phoneNumber: string,
                readonly name: string) {
        this._location = location;
        this._email = email;
        this._phoneNumber = phoneNumber;
        this._name = name;
    }
}
