import { IAttendee } from "./attendee";

export interface ITrip {
    id?: number;
    name: string;
    description: string;
    totalExpense?: number;
    attendees?: IAttendee[];
}