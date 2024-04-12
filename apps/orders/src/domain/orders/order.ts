import {Package} from "./package";
import {User} from "../users/user";
import {OrderState} from "./order-state";
import {OrderStateEnum} from "./order-state.config";
import {HttpException, HttpStatus} from "@nestjs/common";

export class Order {
    private static readonly MAX_VOLUME_FREE_CHARGE = 5000;

    private readonly _price: number = 0;
    private readonly _state: OrderState;

    constructor(private readonly _dropOff: User,
                private readonly _pickUp: User,
                private readonly _packages: Package[],
                private readonly orderState: OrderStateEnum = OrderStateEnum.CREATED) {
        this._state = new OrderState(orderState)
        this.validateInputs()

        this._price = this.calculatePrice()
    }


    get price(): number {
        return this._price;
    }

    get state(): OrderState {
        return this._state;
    }

    get dropOff(): User {
        return this._dropOff;
    }

    get pickUp(): User {
        return this._pickUp;
    }

    get packages(): Package[] {
        return this._packages;
    }

    /**
     * Each package costs €1.
     * If the volume of the package is less than 5000, then no additional charge.
     * For every 5000 increase in volume, add €0.50 to the price.
     * For every kilogram of weight, add €0.10 to the price.
     * For the first example package above, the price would be €7.00
     */
    private calculatePrice(): number {
        const packagesSize = this._packages.length;

        return this._packages.reduce((acc, thisPackage) => {
            let additionalCost = 0;

            additionalCost += this.priceForVolume(thisPackage)
            additionalCost += this.priceForWeight(thisPackage)

            return acc + additionalCost
        }, packagesSize)
    }

    /**
     * If the volume of the package is less than 5000, then no additional charge.
     * For every 5000 increase in volume, add €0.50 to the price.
     *
     * @param thisPackage
     * @private
     */
    private priceForVolume(thisPackage: Package): number {
        if (thisPackage.volume < Order.MAX_VOLUME_FREE_CHARGE) {
            return 0;
        }

        const valuePerVolumeIncrease = 0.5
        const volumeIncreaseNumber = Math.floor((thisPackage.volume - Order.MAX_VOLUME_FREE_CHARGE) / Order.MAX_VOLUME_FREE_CHARGE)

        return volumeIncreaseNumber * valuePerVolumeIncrease
    }

    /**
     * For every kilogram of weight, add €0.10 to the price.
     * @param thisPackage
     * @private
     */
    private priceForWeight(thisPackage: Package): number {
        const valuePerWeightIncrease = 0.10
        return thisPackage.weight * valuePerWeightIncrease
    }

    private validateInputs() {
        if (this._packages.length === 0) {
            throw new HttpException("At least 1 package needs to exist!", HttpStatus.BAD_REQUEST)
        }

        if (!this.dropOff || !this.pickUp) {
            throw new HttpException("DropOff and PickUp are required!", HttpStatus.BAD_REQUEST)
        }
    }
}
