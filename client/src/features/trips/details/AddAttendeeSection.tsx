import React, { useEffect, useState } from 'react'
import { IAttendee } from '../../../app/models/attendee';
import { useAppDispatch, useAppSelector } from '../../../app/stores/hooks'
import { addAttendees, currentTrip } from '../../../app/stores/tripStore';
import { allUsers, getAllUsers } from '../../../app/stores/userStore'
import { IAddAttendeeParams } from '../../../app/types/types';
import CommonSelectionTemplate from './CommonSelectionTemplate';
import ShowSelectedItem from './ShowSelectedItem';

const AddAttendeeSection = ({ tripId }: { tripId: number }) => {
    const allusers = useAppSelector(allUsers);
    const dispatch = useAppDispatch();
    const currentTripSelected = useAppSelector(currentTrip)
    const [selectedAttendeeId, setSelectedAttendeeId] = useState<IAttendee[]>(currentTripSelected.attendees ?? []);
    useEffect(() => {
        return(() => {
            dispatch(getAllUsers());
        })
    }, [])

    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        let id = event.target.value;
        if (selectedAttendeeId.filter(at => at.id === id).length === 0) {
            setSelectedAttendeeId([...selectedAttendeeId, { id: id, displayName: allusers.get(id)?.displayName! }])
        }
    }

    const saveAttendees = (tripId: number) => {
        const attendees: IAddAttendeeParams = {
            id: tripId, userIds: selectedAttendeeId.map(at => at.id)
        }
        dispatch(addAttendees(attendees))
    }

    const removeAttendeeId = (id: string) => {
        const newAttendeeIds = selectedAttendeeId.filter(at => at.id !== id);
        setSelectedAttendeeId([...newAttendeeIds])
    }

    return (
        <div className='sec'>
            <div className='row'>

                <div className='col-sm-4'>
                    {allusers.values() &&
                        <CommonSelectionTemplate usersToSelect={Array.from(allusers.values())} handleChange={handleChange} />
                    }
                </div>
                <div className='col-sm-8'>
                    <ShowSelectedItem selectedAttendees={selectedAttendeeId} removeAttendee={removeAttendeeId} />
                </div>
                <button
                    className='btn btn-outline-primary'
                    style={{
                        marginTop: '10px'
                    }}
                    onClick={() => saveAttendees(tripId)}
                >
                    Save Attendees
                </button>
            </div>

        </div>

    )
}

export default AddAttendeeSection