// public Dictionary<string, Dictionary<string, decimal>> 
// OwingReport { get; set; }

import { IAttendee } from "./attendee";

// export interface IExpenseReport {
//     owingReport: {
//         [owedTo: string]: {
//             [shareesId: string]: number
//         };
//     }
// }
interface Sharee {
    sharee: string;
    amount: number;
}

export interface IExpenseReport {
    owedTo: string;
    sharees: Sharee[];
}