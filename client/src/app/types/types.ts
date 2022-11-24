import { IExpenseReq } from "../models/expense";

export interface IAddAttendeeParams {
    id: number;
    userIds: string[];
}

export interface IExpenseParams {
    tripId: number;
    expense: IExpenseReq;
}