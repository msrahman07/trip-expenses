import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import agent from "../api/agent";
import { IUser } from "../models/user";

export const loginUser = createAsyncThunk<
    IUser,
    {email: string, password: string}
>(
    'users/loginUser',
    async (user: IUser) => {
        const loggedUser = await agent.Users.login(user);
        return loggedUser
    }
);

const registerUser = createAsyncThunk(
    'users/registerUser',
    async (user: IUser) => {
        return await agent.Users.register(user);
    }
);

const getCurrentUser = createAsyncThunk(
    'users/currentUser',
    async () => {
        return await agent.Users.current();
    }
);

export const userStore = createSlice({
    name: 'users',
    initialState: {
        user: {} as IUser,
        loading: true,
    },
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addCase(loginUser.fulfilled, (state, action) => {
            state.user = action.payload;
            state.loading = false
        })
        builder.addCase(getCurrentUser.fulfilled, (state, action) => {
            state.user = action.payload
        })
        builder.addCase(registerUser.fulfilled, (state, action) => {
            state.user = action.payload
        })
    }
});

export const loadingUser = (state:any) => state.users.loading;

export default userStore.reducer;