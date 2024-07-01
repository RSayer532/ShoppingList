import { store } from "./store";
import { ItemInt } from "../common";

/** Store type definition */
export type RootState = ReturnType<typeof store.getState>;

/** Defintions of the input variable types for each reducer function */

// Input type for adding an item
export interface ItemPL {
    payload: ItemInt;
}

// Input type for modifying the budget
export interface BudgetPL {
    payload: number;
}

// Input type for modifying the quantity of an item
export interface QuantityPL {
    payload: {
        quantity: number;
        name: string;
    };
}

// Input type for toggling the editing state of the app
export interface EditingPL {
    payload: boolean;
}

/** Common functions */

// Calculate the remaining budget from the budget and the current items in the list
export const calculateRemaining = (budget: number, itemList: ItemInt[]) => {
    let total = itemList.reduce((total, item) => total + item.price * item.quantity, 0);
    return budget - total;
};

export const calculateTotalSpent = (itemList: ItemInt[]) => {
    return itemList.reduce((total, item) => total + item.price * item.quantity, 0);
};
