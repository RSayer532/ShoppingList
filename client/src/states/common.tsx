import { store } from "./store";
import { ItemInt } from "../common";

/** Interfaces */
export type RootState = ReturnType<typeof store.getState>;

export interface ItemPL {
    payload: ItemInt;
}

export interface BudgetPL {
    payload: number;
}

export interface QuantityPL {
    payload: {
        quantity: number;
        name: string;
    };
}

export interface EditingPL {
    payload: boolean;
}

/** Common functions */
export const calculateRemaining = (budget: number, itemList: ItemInt[]) => {
    let total = itemList.reduce((total, item) => total + item.price * item.quantity, 0);
    return budget - total;
};
