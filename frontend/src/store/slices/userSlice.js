import { createSlice } from "@reduxjs/toolkit";

const initialState = {};
const userSlice = createSlice({
    initialState,
    name: "user",
    reducers: {
        setUser: (_, { payload }) => payload,
        resetUser: () => initialState,
    },
});

export const { setUser, resetUser } = userSlice.actions;

export default userSlice.reducer;
