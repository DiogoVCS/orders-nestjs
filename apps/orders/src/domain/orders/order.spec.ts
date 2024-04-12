import {Package, TPackageDimensions} from "./package";
import {Order} from "./order";
import {User} from "../users/user";
import {Location} from "../users/location"

describe('Order', () => {
    const user = new User(new Location("Street 1", "Porto", "Portugal", "234124 123"), "das@gmail.com", "+351919191919", "Diogo")


    describe('calculatePrice', () => {
        it('calculates price correctly with no packages', () => {
            const order = new Order(user, user, []);
            expect(order.price).toBe(0);
        });

        it('calculates price correctly for packages below free charge volume', () => {
            const packages = [
                new Package(getPackageDimensions(4999), 10),
            ];
            const order = new Order(user, user, packages);
            expect(order.price).toBe(1 + (10 * 0.10));
        });

        it('calculates price for packages above free charge volume', () => {
            const packages = [
                new Package(getPackageDimensions(10000), 10),
            ];
            const order = new Order(user, user, packages);
            expect(order.price).toBe(1 + 0.50 + (10 * 0.10));
        });

        it('calculates price correctly for multiple packages', () => {
            const packages = [
                new Package(getPackageDimensions(10000), 10),
                new Package(getPackageDimensions(15000), 5)
            ];
            const order = new Order(user, user, packages);
            expect(order.price).toBe(2 + (0.50 + 1) + (5 * 0.10) + (10 * 0.10));
        });

        it.each([
            [5000, 5, 5 * 0.10],
            [9999, 10, 10 * 0.10],
            [10000, 1, 0.50 + 1 * 0.10],
            [20000, 2, 1.50 + 2 * 0.10]
        ])('calculates price for edge case volumes and weights (%p, %p)', (volume, weight, expectedPrice) => {
            const packages = [new Package(getPackageDimensions(volume), weight)];
            const order = new Order(user, user, packages);
            expect(order.price).toBeCloseTo(1 + expectedPrice, 2);
        });
    });
});

function getPackageDimensions(value: number): TPackageDimensions {
    return {
        height: value,
        width: 1,
        length: 1
    }
}
