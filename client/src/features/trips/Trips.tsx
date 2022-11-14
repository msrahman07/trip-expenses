import React, { useEffect, useState } from 'react'
import agent from '../../app/api/agent';
import { trip } from '../../app/models/trip';

const Trips = () => {
    const [trips, setTrips] = useState<trip[]>([]);

    useEffect(() => {
        const result = agent.Trips.list().then(t => {
            setTrips(t);
        });
    }, [])

    return (
        <div className='row'>
            {trips.map((trip) => (
                <div className='sec col-lg-4 col-sm-12'>
                    <h3>{trip.name}</h3>
                    {trip.description}
                </div>
            ))}
        </div>
    )
}

export default Trips