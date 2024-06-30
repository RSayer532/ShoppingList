/** Redux */
import { createSlice, createSelector } from "@reduxjs/toolkit";

/** Interfaces/types */
import {
    calculateRemaining,
    calculateTotalSpent,
    RootState,
    ItemPL,
    BudgetPL,
    QuantityPL
} from "./common";

import { ItemsState } from "../common";

// For testing purposes
const initialState: ItemsState = {
    budget: 100,
    remaining: 100 - (0.5 * 2 + 1 * 5),
    items: [
        {
            name: "Banana",
            price: 0.5,
            quantity: 2
        },
        {
            name: "Apples",
            price: 1.0,
            quantity: 5
        }
    ]
};

const itemSlice = createSlice({
    name: "groceries",
    initialState,
    reducers: {
        addItem(state: ItemsState, action: ItemPL) {
            // Add item to array
            state.items.push(action.payload);

            // Modify the remaining budget
            state.remaining = calculateRemaining(state.budget, state.items);
        },

        removeItem(state: ItemsState, action: ItemPL) {
            // Find item in array and remove
            let itemIndex = state.items.findIndex((item) => item.name === action.payload.name);
            state.items.splice(itemIndex, 1);

            // Add the total cost of the number of items back to remaining
            let total = action.payload.price * action.payload.quantity;
            state.remaining += total;
        },

        modifyQuantity(state: ItemsState, action: QuantityPL) {
            // Get values from action
            let quantity = action.payload.quantity;
            let name = action.payload.name;

            // Update the item in the array
            let itemIndex = state.items.findIndex((item) => item.name === name);
            state.items[itemIndex].quantity = quantity;

            // update the remaining value
            state.remaining = calculateRemaining(state.budget, state.items);
        },

        setBudget(state: ItemsState, action: BudgetPL) {
            // Set budget value
            state.budget = action.payload;

            // Recalculate the remaining value
            state.remaining = calculateRemaining(state.budget, state.items);
        }
    }
});

// Export action creators
export const { addItem, setBudget, removeItem, modifyQuantity } = itemSlice.actions;

// Export slice's reducer
export default itemSlice.reducer;

// Selector functions
export const selectAllItems = (state: RootState) => state.groceries.items;
export const selectBudget = (state: RootState) => state.groceries.budget;
export const selectRemaining = (state: RootState) => state.groceries.remaining;

// Memoized selector functions
export const selectExistingItems = createSelector([selectAllItems], (items) =>
    items.map((item) => item.name)
);
export const selectExistingTotal = createSelector([selectAllItems], calculateTotalSpent);
