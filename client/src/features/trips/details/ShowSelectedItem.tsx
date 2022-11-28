import React from 'react'
import { IAttendee } from '../../../app/models/attendee'

interface Iprop {
    selectedAttendees: IAttendee[];
    removeAttendee: (id: string) => void;
}

const ShowSelectedItem = ({ selectedAttendees, removeAttendee }: Iprop) => {
    return (
        <div className='row'>
            {selectedAttendees.map((attendee) => (

                <div
                    className='col'
                    style={{
                        padding: '5px 10px',
                        borderRadius: '5px',
                        backgroundColor: '#8fb5f4fb',
                        minWidth: 'fit-content',
                        maxWidth: 'fit-content',
                        height: 'fit-content',
                        margin: '10px',
                        cursor: 'pointer',
                        textAlign: 'center',
                    }}
                    key={attendee.id}
                    onClick={() => removeAttendee(attendee.id)}
                >
                    <span>{attendee.displayName!}</span>
                    <span
                        style={{
                            position: 'relative',
                            fontSize: '0.8em',
                            top: '-7px',
                            float: 'right',
                            right: '-5px',
                            color: '#5c5555'
                        }}
                    >
                        x
                    </span>
                </div>

            ))}
        </div>
    )
}

export default ShowSelectedItem