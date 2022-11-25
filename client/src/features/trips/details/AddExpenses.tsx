import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import { IAttendee } from '../../../app/models/attendee';
import { useAppDispatch, useAppSelector } from '../../../app/stores/hooks';
import { addExpense, currentTrip } from '../../../app/stores/tripStore';
import CommonSelectionTemplate from './CommonSelectionTemplate';
import ShowSelectedItem from './ShowSelectedItem';

const AddExpenses = () => {
    const currentSelectedTrip = useAppSelector(currentTrip);
    const tripAttendees = currentSelectedTrip.attendees;
    const [selectAttendees, setSelectAttendees] = useState(tripAttendees);
    const [spender, setSpender] = useState<IAttendee | null>(null);
    const [sharees, setSharees] = useState<IAttendee[]>([]);
    const [showSection, setShowSection] = useState('spender');
    const [amount, setAmount] = useState<number>(0);
    const [title, setTitle] = useState<string>('General');
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (spender !== null) {
            setSelectAttendees(tripAttendees?.filter(at => at.id !== spender.id));
        }

    }, [spender]);


    const handleAddSpender = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const id = e.target.value;
        var newSender = selectAttendees?.filter(at => at.id === id)[0] ?? null
        setSpender(newSender);
    }

    const handleAddSharees = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const id = e.target.value;
        if (sharees.filter(at => at.id === id).length === 0) {
            setSharees([...sharees, ...tripAttendees?.filter(at => at.id === id)!]);
        }
    }
    const handleAddAllSharees = () => {
        setSharees([...tripAttendees!]);
    }
    const removeSpender = (id: string) => {
        setSpender(null);
        setSelectAttendees([...selectAttendees!, ...tripAttendees!.filter(at => at.id === id)])
    }
    const removeSharee = (id: string) => {
        setSharees([...sharees.filter(at => at.id !== id)])
    }

    const handleAmountInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.value !== '') {
            setAmount(parseFloat(e.target.value))
        }
        else {
            setAmount(0)
        }
    }

    const handleAddExpense = () => {
        dispatch(addExpense({
            tripId: currentSelectedTrip.id!, expense: {
                title: title, spenderId: spender!.id,
                sharedAmongAttendeesIds: sharees.map(at => at.id),
                amount: amount!
            }
        })).then(() => {
            setShowSection('spender');
            toast.success('New expense added')
        });
    }

    return (
        <div className='sec'>
            <div className="input-group mb-3">
                <div className="input-group-prepend">
                    <span className="input-group-text" id="inputGroup-sizing-default">Name of expense</span>
                </div>
                <input
                    value={title} onChange={(e) => setTitle(e.target.value)}
                    type="text" className="form-control" aria-label="Default" aria-describedby="inputGroup-sizing-default" />
            </div>
            {showSection === 'spender' &&
                <div className="row">
                    <h4>Select Spender</h4>
                    <div className='col-sm-4'>
                        <CommonSelectionTemplate usersToSelect={selectAttendees!} handleChange={handleAddSpender} />
                    </div>
                    {spender !== null &&
                        <div className='col-sm-8'>
                            <ShowSelectedItem selectedAttendees={[spender]} removeAttendee={removeSpender} />
                        </div>
                    }
                    <button disabled={spender === null} className='btn btn-outline-primary mt-3' onClick={() => setShowSection('sharees')}>Select Sharees</button>
                </div>
            }
            {showSection === 'sharees' &&

                <div className="row">
                    <span><h4>Select Sharees</h4> <span onClick={handleAddAllSharees}>Select All</span></span>
                    <div className='col-sm-4'>
                        <CommonSelectionTemplate usersToSelect={tripAttendees!} handleChange={handleAddSharees} />
                    </div>
                    <div className='col-sm-8'>
                        <ShowSelectedItem selectedAttendees={sharees} removeAttendee={removeSharee} />
                    </div>
                    <button className='btn btn-outline-primary mt-3 col-6' onClick={() => setShowSection('spender')}>Edit Spender</button>
                    <button disabled={sharees.length === 0} className='btn btn-outline-primary mt-3 col-6' onClick={() => setShowSection('amount')}>Select Amount</button>
                </div>
            }
            {showSection === 'amount' &&
                <>
                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text" id="inputGroup-sizing-default">Amount $</span>
                        </div>
                        <input
                            value={amount || ''} onChange={(e) => { handleAmountInputChange(e) }}
                            min={0} step={0.1}
                            type="number" className="form-control" aria-label="Default" aria-describedby="inputGroup-sizing-default" />
                    </div>
                    <button className='btn btn-outline-primary mt-2 col-6' onClick={() => setShowSection('sharees')}>Edit Sharees</button>
                    <button onClick={handleAddExpense} disabled={amount === null || amount === 0} className='btn btn-outline-primary mt-2 col-6'>Save Expense</button>
                </>
            }
        </div>
    )
}

export default AddExpenses