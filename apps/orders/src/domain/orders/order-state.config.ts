export enum OrderStateEnum {
    CREATED = "CREATED",
    PICKED_UP = "PICKED_UP",
    CANCELLED = "CANCELLED",
    DELIVERED = "DELIVERED",
    RETURNING = "RETURNING",
    RETURNED = "RETURNED"
}

type StateTransition<T> = { to?: T[]; };
export type TStateConfig<T extends string | number | symbol> = { [key in T]: StateTransition<T>; };

export const ORDER_STATE_CONFIG: TStateConfig<OrderStateEnum> = {
    CANCELLED: {},
    CREATED: {
        to: [OrderStateEnum.PICKED_UP, OrderStateEnum.CANCELLED]
    },
    DELIVERED: {},
    PICKED_UP: {
        to: [
            OrderStateEnum.DELIVERED,
            OrderStateEnum.RETURNING
        ]
    },
    RETURNED: {},
    RETURNING: {
        to: [OrderStateEnum.RETURNED]
    }
}
