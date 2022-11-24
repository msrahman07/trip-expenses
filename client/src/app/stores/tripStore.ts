import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { number } from "yup";
import agent from "../api/agent"
import { IExpenseReq, IExpenseRes } from "../models/expense";
import { ITrip } from "../models/trip";
import { IExpenseParams } from "../types/types";
import { useAppSelector } from "./hooks";
import { RootState } from "./store";

// const tripRegistry = new Map<string, ITrip>();

interface initialStateType {
    trips: ITrip[],
    currentTrip: ITrip,
    loading: boolean
}

export const loadTrips = createAsyncThunk<
    ITrip[]
>(
    'trips/loadTrips',
    async () => {
        const result = await agent.Trips.list();
        return result;
    }
);

export const createTrip = createAsyncThunk<
    ITrip, ITrip
>(
    'trips/createTrip',
    async (trip: ITrip) => {
        return await agent.Trips.create(trip).catch(error => {
            console.log(error);
        });
    }
);

export const getCurrentTrip = createAsyncThunk<
ITrip,number 
>(
    'trips/getCurrentTrip',
    async (id:number) => {
        const result = await agent.Trips.details(id);
        return result;
    }
);
interface IAddAttendeeParams {
    id: number;
    userIds: string[];
}
export const addAttendees = createAsyncThunk<ITrip, IAddAttendeeParams>(
    'trips/addAttendees',
    async (atendees: IAddAttendeeParams) => {
        return await agent.Trips.addAttendees(atendees.id, atendees.userIds);
    }
)
export const addExpense = createAsyncThunk<IExpenseRes, IExpenseParams>(
    'trips/addExpense',
    async (expense: IExpenseParams) => {
        return await agent.Trips.addExpense(expense.tripId, expense.expense);
    }
)

const tripStore = createSlice({
    name: 'trips',
    initialState: {
        trips: [] as ITrip[],
        currentTrip: null! as ITrip,
        loading: true,
    } as initialStateType,
    reducers: {},
    extraReducers:(builder) => {
        builder.addCase(loadTrips.fulfilled, (state, action) => {
            state.trips = action.payload;
            state.loading = false;
        })
        builder.addCase(createTrip.fulfilled, (state, action) => {
            state.trips.push(action.payload);
            state.loading = false;
        })
        builder.addCase(getCurrentTrip.fulfilled, (state, action) => {
            state.currentTrip = action.payload;
            state.loading = false;
        })
        builder.addCase(addAttendees.fulfilled, (state, action) => {
            state.currentTrip = action.payload;
            state.loading = false;
        })
        builder.addCase(addExpense.fulfilled, (state, action) => {
            state.currentTrip.expenses?.push(action.payload);
            state.loading = false;
        })
    }
})

export const currentTrip = (state: RootState) => state.trips.currentTrip
export const loadedTrips = (state: RootState) => state.trips.trips
export default tripStore.reducer;