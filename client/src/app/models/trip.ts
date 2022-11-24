import { IAttendee } from "./attendee";
import { IExpenseRes } from "./expense";

export interface ITrip {
    id?: number;
    name: string;
    description: string;
    totalExpense?: number;
    attendees?: IAttendee[];
    expenses?: IExpenseRes[];
}