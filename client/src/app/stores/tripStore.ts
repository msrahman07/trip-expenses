import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import agent from "../api/agent"
import { IExpenseRes } from "../models/expense";
import { IExpenseReport } from "../models/expenseReport";
import { ITrip } from "../models/trip";
import { DeleteExpenseParams } from "../types/deleteExpense";
import { IExpenseParams } from "../types/types";
import { RootState } from "./store";

// const tripRegistry = new Map<string, ITrip>();

interface initialStateType {
    trips: ITrip[],
    currentTrip: ITrip,
    loading: boolean,
    expenseReport: IExpenseReport[]
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
        const result = await agent.Trips.create(trip);
        return result;
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

export const deleteTrip = createAsyncThunk<{},number>(
    'trips/deleteTrip',
    async (id: number) => {
        await agent.Trips.delete(id);
    }
)
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

export const getExpenseReport = createAsyncThunk<IExpenseReport[], number>(
    'trips/getExpenseReport',
    async (tripId: number) => {
        return await agent.Trips.getExpenseReport(tripId);
    }
)

export const deleteExpense = createAsyncThunk<number, DeleteExpenseParams>(
    'trips/deleteExpense',
    async (params: DeleteExpenseParams) => {
        await agent.Trips.deleteExpense(params.id, params.expenseId);
        return params.expenseId;
    }
)

const tripStore = createSlice({
    name: 'trips',
    initialState: {
        trips: [] as ITrip[],
        currentTrip: {} as ITrip,
        loading: true,
        expenseReport: []
    } as initialStateType,
    reducers: {},
    extraReducers:(builder) => {
        builder.addCase(loadTrips.fulfilled, (state, action) => {
            state.trips = action.payload;
            state.loading = false;
        })
        builder.addCase(createTrip.fulfilled, (state, action) => {
            // state.trips.push(action.payload);
            state.loading = false;
        })
        builder.addCase(getCurrentTrip.fulfilled, (state, action) => {
            state.currentTrip = action.payload;
            state.loading = false;
        })
        builder.addCase(deleteTrip.fulfilled, (state, action) => {
            // state.currentTrip = null!;
            state.loading = false;
        })

        builder.addCase(addAttendees.fulfilled, (state, action) => {
            state.currentTrip = action.payload;
            state.loading = false;
        })
        builder.addCase(addExpense.fulfilled, (state, action) => {
            // state.currentTrip.expenses?.push(action.payload);
            state.loading = false;
        })
        builder.addCase(getExpenseReport.fulfilled, (state, action) => {
            // state.currentTrip.expenses?.push(action.payload);
            state.expenseReport = action.payload;
            state.loading = false;
        })
        builder.addCase(deleteExpense.fulfilled, (state, action) => {
            // state.currentTrip = null!;
            state.currentTrip.expenses = state.currentTrip.expenses?.filter(e => e.id !== action.payload);
            state.loading = false;
        })
    }
})

export const currentExpenseReport = (state: RootState) => state.trips.expenseReport
export const currentTrip = (state: RootState) => state.trips.currentTrip
export const loadedTrips = (state: RootState) => state.trips.trips
export default tripStore.reducer;