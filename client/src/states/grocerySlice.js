import { createSlice, createSelector } from "@reduxjs/toolkit";

const initialState = {
    budget: 100,
    remaining: 100 - (0.50*2 + 1*5),
    groceryItems: [
    {
        name: "Banana",
        price: 0.50,
        quantity: 2
    },
    {
        name:"Apples",
        price: 1.00,
        quantity: 5
    }]
};

const grocerySlice = createSlice({
    name: "groceries",
    initialState,
    reducers: {
        addGrocery(state, action) {
            // Add item to array
            state.groceryItems.push(action.payload);

            // Modify the remaining budget
            let total = state.groceryItems.reduce((total, item) => total + (item.price*item.quantity), 0);
            state.remaining = state.budget - total;
        },

        removeGrocery(state, action) {
            
            // Find grocery item in array and remove
            let itemIndex = state.groceryItems.indexOf(action.payload);
            state.groceryItems.splice(itemIndex, 1);

            // Add the total cost of the number of items back to remaining
            let total = action.payload.price * action.payload.quantity;
            state.remaining += total;          
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
            // Set budget value
            state.budget = action.payload;

            // Recalculate the remaining value
            let total = state.groceryItems.reduce((total, item) => total + (item.price*item.quantity), 0);
            state.remaining = action.payload - total;
        }
    }
});

export const { addGrocery, setBudget, removeGrocery } = grocerySlice.actions;

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
