import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import agent from "../api/agent";
import { IUser } from "../models/user";

export const loginUser = createAsyncThunk<
    IUser,
    IUser
>(
    'users/loginUser',
    async (user: IUser) => {
        const loggedUser = await agent.Users.login(user);
        window.localStorage.setItem('token', loggedUser.token?.toString());
        return loggedUser
    }
);

export const registerUser = createAsyncThunk<
    IUser,
    IUser    
>(
    'users/registerUser',
    async (user: IUser) => {
        const loggedUser = await agent.Users.register(user);
        window.localStorage.setItem('token', loggedUser.token?.toString());
        return loggedUser
    }
);

export const getCurrentUser = createAsyncThunk<IUser>(
    'users/currentUser',
    async () => {
        const token = window.localStorage.getItem('token');
        if(token){
            return await agent.Users.current();
        }
        else {
            return null;
        }
    }
);

export const logoutUser = createAsyncThunk(
    'users/logoutUser',
    async () => {
        window.localStorage.removeItem('token');
        return await agent.Users.logout();
    }
)

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
        builder.addCase(registerUser.fulfilled, (state, action) => {
            state.user = action.payload;
            state.loading = false;
        })
        builder.addCase(getCurrentUser.fulfilled, (state, action) => {
            state.user = action.payload;
            if(state.user !== null){
                state.loading = false;
            }
            else{
                state.loading = true;
            }
        })
        builder.addCase(logoutUser.fulfilled, (state) => {
            state.user = null!;
            state.loading = true;
        })
    }
});

export const currentUser = (state:any) => state.users.user;
export const loadingUser = (state:any) => state.users.loading;
export const userToken = window.localStorage.getItem('token');
export default userStore.reducer;