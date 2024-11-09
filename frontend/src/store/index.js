import { configureStore } from "@reduxjs/toolkit";
import user from "./slices/userSlice";

const appStore = configureStore({
    reducer: {
        user,
    },
});

export default appStore;
