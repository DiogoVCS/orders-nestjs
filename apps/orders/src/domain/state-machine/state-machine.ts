import {TStateConfig} from "../orders/order-state.config";
import * as console from "console";
import {HttpException, HttpStatus} from "@nestjs/common";

export class InvalidStateException extends HttpException {
    constructor(message = "Invalid State") {
        super(message, HttpStatus.BAD_REQUEST);
    }
}

export class InvalidStateTransitionException extends HttpException {
    constructor(message = "State transition is not valid!") {
        super(message, HttpStatus.BAD_REQUEST);
    }
}


export class StateMachine<T extends string> {
    private _currentState: T;

    constructor(private readonly config: TStateConfig<T>, private readonly initialState?: T) {
        this._currentState = initialState;
    }

    get state(): T {
        return this._currentState;
    }

    transition(nextState?: T): T {
        if (nextState) {
            this.validateState(nextState)
            this.validateTransition(nextState)

            this._currentState = nextState;
            return nextState;
        }

        if (!this._currentState) {
            throw new InvalidStateTransitionException("Transition of Order State from empty state")
        }

        const nextPossibleState = this.config[this._currentState]?.to?.[0]

        if (!nextPossibleState) {
            throw new InvalidStateTransitionException("Order State has no more states to go to.")
        }

        this._currentState = nextPossibleState;

        // Default to first state.
        return nextPossibleState;
    }

    private validateState(nextState: T) {
        if (!this.config[nextState]) {
            throw new InvalidStateException();
        }
    }

    private validateTransition(nextState: T) {
        const validTransition = this.config[this._currentState].to?.includes(nextState);

        if (!validTransition) {
            throw new InvalidStateTransitionException();
        }
    }
}
