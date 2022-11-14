import agent from "../api/agent"
import { trip } from "../models/trip";

export default class TripStore {
    trips:trip[] = []
    loadTrips = async () => {
        const result = await agent.Trips.list();
        this.trips = result;
        console.log(this.trips);
    }
}