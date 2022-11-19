import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import agent from '../../app/api/agent';
import { ITrip } from '../../app/models/trip';
import { loadedTrips, loadTrips } from '../../app/stores/tripStore';

const Trips = () => {
    const trips = useSelector(loadedTrips)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch<any>(loadTrips());
    }, [])

    return (
        <div className='row'>
            {trips.map((trip:ITrip) => (
                <div key={trip.name!} className='sec col-lg-4 col-sm-12'>
                    <h3>{trip.name}</h3>
                    {trip.description}
                </div>
            ))}
        </div>
    )
}

export default Trips