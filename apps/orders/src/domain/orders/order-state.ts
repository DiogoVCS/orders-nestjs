import {StateMachine} from "../state-machine/state-machine";
import {ORDER_STATE_CONFIG, OrderStateEnum} from "./order-state.config";

export class OrderState {
    private readonly _stateMachine = new StateMachine<OrderStateEnum>(ORDER_STATE_CONFIG)

    constructor()
    constructor(thisState: OrderStateEnum)
    constructor(private readonly thisState: OrderStateEnum = OrderStateEnum.CREATED) {
        this._stateMachine = new StateMachine<OrderStateEnum>(ORDER_STATE_CONFIG, thisState);
        this._state = this._stateMachine.state
    }

    private _state: OrderStateEnum;

    get state(): OrderStateEnum {
        return this._state;
    }

    next(state: OrderStateEnum): void {
        this._state = this._stateMachine.transition(state)
    }
}
