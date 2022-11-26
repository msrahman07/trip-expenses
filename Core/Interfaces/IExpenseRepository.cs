using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Core.DTOs;
using Core.Entities;

namespace Core.Interfaces
{
    public interface IExpenseRepository
    {
        Task<ExpenseDto> AddNewExpense(int tripId, string title, string spenderId, 
            List<string> sharedAmongAttendeesIds, decimal amount);
        Task<IReadOnlyList<ExpenseDto>> GetAllExpenses(int tripId);
        Task<ExpenseReportDto> GenerateExpenseReport(int tripId);
        Task DeleteExpense(int ExpenseId);
    }
}