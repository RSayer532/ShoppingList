import { createSlice, createSelector } from "@reduxjs/toolkit";
import { calculateRemaining } from "../utils/calculations";

const initialState = {
    budget: 100,
    remaining: 100 - (0.5 * 2 + 1 * 5),
    groceryItems: [
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

const grocerySlice = createSlice({
    name: "groceries",
    initialState,
    reducers: {
        addGrocery(state, action) {
            // Add item to array
            state.groceryItems.push(action.payload);

            // Modify the remaining budget
            state.remaining = calculateRemaining(state.budget, state.groceryItems);
        },

        removeGrocery(state, action) {
            // Find grocery item in array and remove
            let itemIndex = state.groceryItems.findIndex(
                (item) => item.name === action.payload.name
            );
            state.groceryItems.splice(itemIndex, 1);

            // Add the total cost of the number of items back to remaining
            let total = action.payload.price * action.payload.quantity;
            state.remaining += total;
        },

        modifyQuantity(state, action) {
            // Get values from action
            let quantity = action.payload.quantity;
            let name = action.payload.name;

            // Update the item in the grocery array
            let itemIndex = state.groceryItems.findIndex((item) => item.name === name);
            state.groceryItems[itemIndex].quantity = quantity;

            // update the remaining value
            state.remaining = calculateRemaining(state.budget, state.groceryItems);
        },

        setBudget(state, action) {
            // Set budget value
            state.budget = action.payload;

            // Recalculate the remaining value
            state.remaining = calculateRemaining(state.budget, state.groceryItems);
        }
    }
});

export const { addGrocery, setBudget, removeGrocery, modifyQuantity } = grocerySlice.actions;

export default grocerySlice.reducer;

export const selectAllGroceries = (state) => state.groceries.groceryItems;
export const selectBudget = (state) => state.groceries.budget;
export const selectRemaining = (state) => state.groceries.remaining;
export const selectSpendingLimit = (state) => state.groceries.spendingLimit;

export const selectExistingItems = createSelector([selectAllGroceries], (items) =>
    items.map((item) => item.name)
);
export const selectExistingTotal = createSelector([selectAllGroceries], (items) =>
    items.reduce((total, item) => total + item.price, 0)
);
