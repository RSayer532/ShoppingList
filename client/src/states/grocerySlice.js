import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    budget: 0,
    remaining: 0,
    groceryItems: []
};

const grocerySlice = createSlice({
    name: "groceries",
    initialState,
    reducers: {
        addGrocery(state, action) {
            // Implement logic
            return {
                ...state
            };
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
        }
    }
});

export const { addGrocery } = grocerySlice.actions;

export default grocerySlice.reducer;

export const selectAllGroceries = (state) => state.groceries.groceryItems;
export const selectBudget = (state) => state.groceries.budget;
export const selectRemaining = (state) => state.groceries.remaining;
export const selectSpendingLimit = (state) => state.groceries.spendingLimit;
