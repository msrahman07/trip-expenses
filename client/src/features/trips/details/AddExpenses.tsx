import React, { useEffect, useState } from 'react'
import { IAttendee } from '../../../app/models/attendee';
import { useAppSelector } from '../../../app/stores/hooks';
import { currentTrip } from '../../../app/stores/tripStore';
import CommonSelectionTemplate from './CommonSelectionTemplate';
import ShowSelectedItem from './ShowSelectedItem';

const AddExpenses = () => {
    const currentSelectedTrip = useAppSelector(currentTrip);
    const [tripAttendees, setTripAttendees] = useState(currentSelectedTrip.attendees);
    const [spender, setSpender] = useState<IAttendee>();
    const [sharees, setSharees] = useState<IAttendee[]>([]);

    useEffect(() => {
        // console.log(currentSelectedTrip);
    }, []);
    const handleAddSpender = async (e: React.ChangeEvent<HTMLSelectElement>) => {
        const id = e.target.value;
        if(spender !== null) {
            console.log(spender);
            var result = setTripAttendees([spender!]);
        }
        await setSpenderAsync(tripAttendees?.filter(at => at.id === id)[0]!).then(
            () => console.log(spender)
        );
        setTripAttendees([...tripAttendees?.filter(at => at.id !== id)!])
        // console.log(spender);

    }

    const setSpenderAsync = (newSpender: IAttendee) => {
        return new Promise<void>((resolve) => {
            setSpender(newSpender);
            resolve();
        }).then(
            () => console.log(spender)
        );
    }
    const handleAddSharees = (e: React.ChangeEvent<HTMLSelectElement>) => {
        
    }
    const removeSpender = (id: string) => {
        setSpender(null!);
        setTripAttendees([...tripAttendees!, ...currentSelectedTrip.attendees?.filter(at => at.id === id)!])
    }
    const removeSharee = (id: string) => { }
    return (
        <div className='sec'>
            <div className='row'>
                <div className="col-12 col-sm-6 mb-2 d-flex flex-column">
                    <h4>Select Spender</h4>
                    <CommonSelectionTemplate usersToSelect={tripAttendees!} handleChange={handleAddSpender} />
                    {spender !== undefined &&
                    <ShowSelectedItem selectedAttendees={[spender]} removeAttendee={removeSpender} />
}
                    
                </div>
                <div className="col-12 col-sm-6">
                    <h4>Select Sharees</h4>

                    <CommonSelectionTemplate usersToSelect={tripAttendees!} handleChange={handleAddSharees} />
                    {/* <ShowSelectedItem selectedAttendees={sharees} removeAttendee={removeSharee} /> */}
                    <ShowSelectedItem selectedAttendees={sharees} removeAttendee={()=> console.log('clicked')} />
                </div>

            </div>


        </ div>

    )
}

export default AddExpenses