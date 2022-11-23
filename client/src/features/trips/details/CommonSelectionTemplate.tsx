import React from 'react'
import { IAttendee } from '../../../app/models/attendee'
import { IUser } from '../../../app/models/user'

interface IProps {
    usersToSelect: IUser[] | IAttendee[];
    handleChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const CommonSelectionTemplate = ({usersToSelect, handleChange} : IProps) => {
    return (
        <select
            className="form-select"
            size={3}
            aria-label="size 3 select"
            onChange={(e) => handleChange(e)}
        // onSelect={(e) => console.log(e.target)}
        >
            {usersToSelect.map((user) => (
                <option key={user.id} value={user.id}>{user.displayName}</option>
            ))}
        </select>
    )
}

export default CommonSelectionTemplate