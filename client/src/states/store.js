import { configureStore } from "@reduxjs/toolkit";
import groceryReducer from "./grocerySlice";

export const store = configureStore({
    reducer: {
        groceries: groceryReducer
    }
});
