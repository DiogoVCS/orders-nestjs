import {Types} from "mongoose";

export function convertToDecimal128(num: number): Types.Decimal128 {
    // Convert the number to a string to avoid precision issues
    return Types.Decimal128.fromString(num.toString());
}
