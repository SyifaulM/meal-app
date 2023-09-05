import { configureStore } from "@reduxjs/toolkit";
import mealsReducer from "./meals/mealsSlice";

const store = configureStore ({
    reducer:{
        meals: mealsReducer,
    },
});

export default store;
