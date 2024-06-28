import { createSlice, createSelector } from "@reduxjs/toolkit";

const initialState = {
    budget: 100,
    remaining: 100,
    groceryItems: []
};

const grocerySlice = createSlice({
    name: "groceries",
    initialState,
    reducers: {
        addGrocery(state, action) {
            // Add item to array
            state.groceryItems.push(action.payload);

            // Modify the remaining budget
            let total = state.groceryItems.reduce((total, item) => total + item.price, 0);
            state.remaining = state.budget - total;
        },

        removeGrocery(state, action) {
            // Implement logic
            return {
                ...state
            };
        },

        increaseQuantity(state, action) {
            //Implement logic
            return {
                ...state
            };
        },

        decreaseQuantity(state, action) {
            //Implement logic
            return {
                ...state
            };
        },

        setBudget(state, action) {
            state.budget = action.payload;
        }
    }
});

export const { addGrocery, setBudget } = grocerySlice.actions;

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
