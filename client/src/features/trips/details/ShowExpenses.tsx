import React from 'react'
import { IAttendee } from '../../../app/models/attendee';
import { useAppDispatch, useAppSelector } from '../../../app/stores/hooks'
import { currentTrip, deleteExpense } from '../../../app/stores/tripStore'

const ShowExpenses = () => {
    const currentTripSelected = useAppSelector(currentTrip);
    const checkSharedAttendee = (expenseAttendeeList: IAttendee[], attendee: IAttendee) => {
        return expenseAttendeeList.some(at => at.id === attendee.id)
    }
    const dispatch = useAppDispatch();

    const handleExpenseDelete = (expenseId: number) => {
        dispatch(deleteExpense({id: currentTripSelected.id!, expenseId}))
    }
    return (
        <div className='sec table-responsive'>
            {currentTripSelected.expenses?.length === 0 ?
                <div>No Expenses</div>
                :
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th scope="col">Name</th>
                            <th scope="col">Spender</th>
                            {currentTripSelected.attendees?.map(attendee => (
                                <th key={attendee.id} scope="col">{attendee.displayName}</th>
                            ))}
                            <th scope="col">Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentTripSelected.expenses?.map(expense => (
                            <tr key={expense.id}>
                                <th scope="row">{expense.title}</th>
                                <th scope="row">{expense.spender.displayName}</th>
                                {currentTripSelected.attendees?.map((attendee) => (
                                    <td key={attendee.id}>{checkSharedAttendee(expense.sharedAmongAttendees, attendee) ? expense.sharedAmount.toFixed(2) : 0}</td>
                                ))}
                                <td>{expense.amount}
                                <button type="button" className="btn btn-danger btn-sm" style={{float: 'right'}}
                                    onClick={() => handleExpenseDelete(expense.id)}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                                        <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" />
                                    </svg>
                                </button>
                                </td>
                            </tr>

                        ))}
                    </tbody>
                </table>
            }
        </div>
    )
}

export default ShowExpenses