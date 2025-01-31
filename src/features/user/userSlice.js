import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: 'user',
    initialState: {
        isConnected: false,
        userInfo: {}
    },
    reducers: {
        setLogin: (state, action) => {
            state.isConnected = true;
            state.userInfo = action.payload;
        },
        setLogout: (state) => {
            state.isConnected = false;
            state.userInfo = {}
        }
    }

})

export default userSlice.reducer;
export const { setLogin, setLogout } = userSlice.actions;