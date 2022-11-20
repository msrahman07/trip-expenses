import React, { useEffect, useState } from 'react'
import { IUser } from '../../../app/models/user';
import { useAppDispatch, useAppSelector } from '../../../app/stores/hooks'
import { allUsers, getAllUsers } from '../../../app/stores/userStore'

const AddAttendeeSection = () => {
    const allusers = useAppSelector(allUsers);
    const dispatch = useAppDispatch();
    const allusersvalues = Array.from(allusers.values());
    const [selectedAttendeeId, setSelectedAttendeeId] = useState<string[]>([]);
    useEffect(() => {
        dispatch(getAllUsers());
    }, [])

    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        let id = event.target.value;
        if(selectedAttendeeId.filter(i => i === id).length === 0) {
            setSelectedAttendeeId([...selectedAttendeeId, id])
        }
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
            <div className='col-sm-8'>
            {selectedAttendeeId.map((i) => (
                            <a href="http://" key={i}>{allusers.get(i)?.displayName} {" "}</a>
                        ))}
            </div>
            
        </div>

    )
}

export default AddAttendeeSection