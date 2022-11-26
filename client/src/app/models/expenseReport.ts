// public Dictionary<string, Dictionary<string, decimal>> 
// OwingReport { get; set; }

export interface IExpenseReport {
    owingReport: Map<string, Map<string, number>>;
}
export interface IOwingReport {
    
    owedId: string;
    sharees: {
        shareeId: string;
        amount: number;
    }

}