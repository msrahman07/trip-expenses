import { IAttendee } from "./attendee";

export interface IExpenseReq{
    title: string;
    spenderId: string;
    sharedAmongAttendeesIds: string[];
    amount: number;
}
export interface IExpenseRes {
    id: number;
    title: string;
    amount: number;
    sharedAmount: number;
    spender: IAttendee;
    sharedAmongAttendees: IAttendee[];
}