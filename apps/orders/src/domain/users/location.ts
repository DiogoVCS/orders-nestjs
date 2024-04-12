import {HttpException, HttpStatus} from "@nestjs/common";

export class Location {
    constructor(private readonly _address: string,
                private readonly _city: string,
                private readonly _country: string,
                private readonly _zipCode: string) {
        this.validateInputs()
    }

    private validateInputs() {
        if (this._zipCode.replaceAll(' ', '').length !== 6) {
            throw new HttpException("The zip code should always be 6 characters (excluding any spaces)!", HttpStatus.BAD_REQUEST)
        }
    }

    get address(): string {
        return this._address;
    }

    get city(): string {
        return this._city;
    }

    get country(): string {
        return this._country;
    }

    get zipCode(): string {
        return this._zipCode;
    }
}
