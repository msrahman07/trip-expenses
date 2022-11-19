import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import agent from "../api/agent"
import { ITrip } from "../models/trip";

// const tripRegistry = new Map<string, ITrip>();


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


const tripStore = createSlice({
    name: 'trips',
    initialState: {
        trips: [] as ITrip[],
        loading: true,
    },
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
    }
})

export const loadedTrips = (state: any) => state.trips.trips
export default tripStore.reducer;