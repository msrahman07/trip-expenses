import React, { useEffect } from 'react'
import { IExpenseReport } from '../../../app/models/expenseReport';
import { useAppDispatch, useAppSelector } from '../../../app/stores/hooks';
import { currentExpenseReport, currentTrip, getExpenseReport } from '../../../app/stores/tripStore';

const GenerateExpenseReport = () => {
    const dispatch = useAppDispatch();
    const currentTripSelected = useAppSelector(currentTrip)
    const expenseReport = useAppSelector(currentExpenseReport)
    useEffect(() => {
        dispatch(getExpenseReport(currentTripSelected.id!));
    }, []);
    const shapeData = (report:IExpenseReport) => {
        
    }

    return (
        <div>
            {expenseReport !== null &&
                <h1 onClick={() => shapeData(expenseReport)}>Click me</h1>
            }
        </div>
    )
}

export default GenerateExpenseReport