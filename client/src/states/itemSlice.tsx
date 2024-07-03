/** Redux */
import { createSlice, createSelector } from "@reduxjs/toolkit";

/** Interfaces/types */
import {
    calculateRemaining,
    RootState,
    ItemPL,
    BudgetPL,
    QuantityPL,
    EditingPL,
    calculateTotalSpent
} from "./common";

import { ItemInt, ItemsState } from "../common";

// For testing purposes
const initialState: ItemsState = {
    budget: 30,
    remaining: 30,
    items: [],
    inEditingMode: false
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
        },

        setEditingMode(state: ItemsState, action: EditingPL) {
            state.inEditingMode = action.payload;
        }
    }
});

// Export action creators
export const { addItem, setBudget, removeItem, modifyQuantity, setEditingMode } = itemSlice.actions;

// Export slice's reducer
export default itemSlice.reducer;

// Selector functions
export const selectAllItems = (state: RootState) => state.groceries.items;
export const selectBudget = (state: RootState) => state.groceries.budget;
export const selectRemaining = (state: RootState) => state.groceries.remaining;
export const selectEditing = (state: RootState) => state.groceries.inEditingMode;

// Memoized selector functions
export const selectExistingItems = createSelector([selectAllItems], (items) =>
    items.map((item:ItemInt) => item.name)
);
export const selectExistingTotal = createSelector([selectAllItems], calculateTotalSpent);
