import {InvalidStateException, InvalidStateTransitionException, StateMachine} from "./state-machine";
import {OrderStateEnum, TStateConfig} from "../orders/order-state.config";

describe('State Machine', () => {
    const config: TStateConfig<OrderStateEnum> = {
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
    };


    it('should initialize with the provided initial state', () => {
        const machine = new StateMachine(config, OrderStateEnum.CREATED);
        expect(machine.state).toBe('CREATED');
    });

    it('should throw when no initial state is provided and a transition is attempted', () => {
        const machine = new StateMachine(config);
        expect(() => machine.transition()).toThrow(InvalidStateTransitionException);
    });


    describe('transition method', () => {
        it.each([
            ['CREATED', 'PICKED_UP', 'PICKED_UP'],
            ['PICKED_UP', 'DELIVERED', 'DELIVERED'],
            ['CREATED', 'CANCELLED', 'CANCELLED']
        ])('should transition from %s to %s and get %s as current state', (initial, next, expected) => {
            const machine = new StateMachine(config, initial);
            const result = machine.transition(next);
            expect(result).toBe(expected);
            expect(machine.state).toBe(expected);
        });

        it('should automatically transition to the next possible state if no next state is provided', () => {
            const machine = new StateMachine(config, OrderStateEnum.CREATED);
            const result = machine.transition();
            expect(result).toBe('PICKED_UP');
            expect(machine.state).toBe('PICKED_UP');
        });

        it.each([
            ['CREATED', 'DELIVERED'],
            ['DELIVERED', 'CREATED']
        ])('should throw an InvalidStateTransitionException when invalid transition from %s to %s', (initial, next) => {
            const machine = new StateMachine(config, initial);
            expect(() => machine.transition(next)).toThrow(InvalidStateTransitionException);
        });

        it('should throw an InvalidStateException if the next state does not exist in config', () => {
            const machine = new StateMachine(config, OrderStateEnum.CREATED);
            expect(() => machine.transition('UNKNOWN' as OrderStateEnum)).toThrow(InvalidStateException);
        });

        it('should throw an exception if no more states to go to', () => {
            const machine = new StateMachine(config, OrderStateEnum.DELIVERED);
            expect(() => machine.transition()).toThrow(InvalidStateTransitionException);
        });
    });
});

