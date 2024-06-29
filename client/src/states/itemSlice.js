import { createSlice, createSelector } from "@reduxjs/toolkit";
import { calculateRemaining } from "../utils/calculations";

const initialState = {
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
        addItem(state, action) {
            // Add item to array
            state.items.push(action.payload);

            // Modify the remaining budget
            state.remaining = calculateRemaining(state.budget, state.items);
        },

        removeItem(state, action) {
            // Find item in array and remove
            let itemIndex = state.items.findIndex((item) => item.name === action.payload.name);
            state.items.splice(itemIndex, 1);

            // Add the total cost of the number of items back to remaining
            let total = action.payload.price * action.payload.quantity;
            state.remaining += total;
        },

        modifyQuantity(state, action) {
            // Get values from action
            let quantity = action.payload.quantity;
            let name = action.payload.name;

            // Update the item in the array
            let itemIndex = state.items.findIndex((item) => item.name === name);
            state.items[itemIndex].quantity = quantity;

            // update the remaining value
            state.remaining = calculateRemaining(state.budget, state.items);
        },

        setBudget(state, action) {
            // Set budget value
            state.budget = action.payload;

            // Recalculate the remaining value
            state.remaining = calculateRemaining(state.budget, state.items);
        }
    }
});

export const { addItem, setBudget, removeItem, modifyQuantity } = itemSlice.actions;

export default itemSlice.reducer;

export const selectAllItems = (state) => state.groceries.items;
export const selectBudget = (state) => state.groceries.budget;
export const selectRemaining = (state) => state.groceries.remaining;
export const selectSpendingLimit = (state) => state.groceries.spendingLimit;

export const selectExistingItems = createSelector([selectAllItems], (items) =>
    items.map((item) => item.name)
);
export const selectExistingTotal = createSelector([selectAllItems], (items) =>
    items.reduce((total, item) => total + item.price, 0)
);
