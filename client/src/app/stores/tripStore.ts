import agent from "../api/agent"
import { ITrip } from "../models/trip";

export default class TripStore {
    trips:ITrip[] = []
    loadTrips = async () => {
        const result = await agent.Trips.list();
        this.trips = result;
        console.log(this.trips);
    }
    createTrip = async (trip: ITrip) => {
        await agent.Trips.create(trip).catch(error => {
            console.log(error);
        });
    }
}