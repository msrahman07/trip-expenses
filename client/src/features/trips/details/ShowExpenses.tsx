import React from 'react'
import { IAttendee } from '../../../app/models/attendee';
import { useAppSelector } from '../../../app/stores/hooks'
import { currentTrip } from '../../../app/stores/tripStore'

const ShowExpenses = () => {
    const currentTripSelected = useAppSelector(currentTrip);
    const checkSharedAttendee = (expenseAttendeeList: IAttendee[], attendee: IAttendee) => {
        return expenseAttendeeList.some(at => at.id === attendee.id)
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
                                <td>{expense.amount}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            }
        </div>
    )
}

export default ShowExpenses