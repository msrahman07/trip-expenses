import React, { useEffect, useState } from 'react'
import { string } from 'yup';
import { IExpenseReport } from '../../../app/models/expenseReport';
import { useAppDispatch, useAppSelector } from '../../../app/stores/hooks';
import { currentExpenseReport, currentTrip, getExpenseReport } from '../../../app/stores/tripStore';

const GenerateExpenseReport = () => {
    const dispatch = useAppDispatch();
    const currentTripSelected = useAppSelector(currentTrip)
    const expenseReport = useAppSelector(currentExpenseReport)
    const [attendeesMap, setAttendeesMap] = useState<Map<string, string>>()
    useEffect(() => {
        dispatch(getExpenseReport(currentTripSelected.id!));
        const attendees = new Map<string, string>(currentTripSelected.attendees?.map(att => {return [att.id, att.displayName]}))
        setAttendeesMap(attendees);
    }, []);
    

    return (
        <div className='sec'>
            {(expenseReport !== null && attendeesMap) &&
                <div className='row'>
                    {expenseReport.map(expense => (
                            <div key={expense.owedTo} className='sec col-6 col-md-3'>
                                <header>{attendeesMap.get(expense.owedTo)} gets money from:</header>
                                <hr />
                                <div className='d-flex flex-column'>
                                    {expense.sharees && expense.sharees.map((sharee) => (
                                        <span><strong>{attendeesMap.get(sharee.sharee)}</strong>: ${sharee.amount}</span>
                                    ))}
                                </div>

                            </div>
                        
                    ))}
                </div>
            }
        </div>
    )
}

export default GenerateExpenseReport