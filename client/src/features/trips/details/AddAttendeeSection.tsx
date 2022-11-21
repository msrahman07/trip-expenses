import React, { useEffect, useState } from 'react'
import { IAttendee } from '../../../app/models/attendee';
import { IUser } from '../../../app/models/user';
import { useAppDispatch, useAppSelector } from '../../../app/stores/hooks'
import { addAttendees, currentTrip } from '../../../app/stores/tripStore';
import { allUsers, getAllUsers } from '../../../app/stores/userStore'
import { IAddAttendeeParams } from '../../../app/types/types';

const AddAttendeeSection = ({ tripId }: { tripId: number }) => {
    const allusers = useAppSelector(allUsers);
    const dispatch = useAppDispatch();
    const [selectedAttendeeId, setSelectedAttendeeId] = useState<string[]>([]);
    const currentTripSelected = useAppSelector(currentTrip)
    useEffect(() => {
        const newArrayOfIds:string[] = [];
        currentTripSelected.attendees?.forEach((item:IAttendee) => {
            newArrayOfIds.push(item.id);
        })
        setSelectedAttendeeId([...newArrayOfIds]);
        dispatch(getAllUsers());
    }, [])

    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        let id = event.target.value;
        if (selectedAttendeeId.filter(i => i === id).length === 0) {
            setSelectedAttendeeId([...selectedAttendeeId, id])
        }
    }

    const saveAttendees = (tripId: number) => {
        const attendees: IAddAttendeeParams = {
            id: tripId, userIds: selectedAttendeeId
        }
        dispatch(addAttendees(attendees))
    }

    const removeAttendeeId = (id: string) => {
        const newAttendeeIds = selectedAttendeeId.filter(i => i !== id);
        setSelectedAttendeeId([...newAttendeeIds])
    }

    return (
        <div className='row sec'>
            <div className='col-sm-4'>
                {allusers.values() &&
                    <select
                        className="form-select"
                        multiple aria-label="size 3 select"
                        onChange={(e) => handleChange(e)}
                    // onSelect={(e) => console.log(e.target)}
                    >
                        {Array.from(allusers.values()).map((user) => (
                            <option key={user.id} value={user.id}>{user.displayName}</option>
                        ))}
                    </select>
                }
            </div>
            <div className='col-sm-8 d-sm-inline-flex'>
                {selectedAttendeeId.map((i) => (
                    <div
                        style={{
                            padding: '5px 10px',
                            borderRadius: '5px',
                            backgroundColor: '#8fb5f4fb',
                            width: 'fit-content',
                            height: 'fit-content',
                            margin: '10px',
                            cursor: 'pointer',
                        }}
                        key={i}
                        onClick={() => removeAttendeeId(i)}
                    >
                        <span>{allusers.get(i)?.displayName}</span>
                        <span 
                            style={{
                                position:'relative', 
                                fontSize:'0.8em', 
                                top: '-7px', 
                                float:'right', 
                                right:'-5px',
                                color: '#5c5555'
                            }}
                        >
                            x
                        </span>
                    </div>
                ))}
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

    )
}

export default AddAttendeeSection