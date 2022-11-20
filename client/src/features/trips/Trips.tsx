import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useNavigation } from 'react-router-dom';
import agent from '../../app/api/agent';
import { ITrip } from '../../app/models/trip';
import { loadedTrips, loadTrips } from '../../app/stores/tripStore';

const Trips = () => {
    const trips = useSelector(loadedTrips)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(() => {
        dispatch<any>(loadTrips());
    }, [])

    return (
        <div className='row'>
            {trips.map((trip: ITrip) => (
                    <div
                        key={trip.id}
                        className='sec col-lg-4 col-sm-12'
                        onClick={() => navigate(`/trips/${trip.id}`)}
                    >
                        <h3>{trip.name}</h3>
                        {trip.description}
                        <button style={{
                            backgroundColor: '#222a37',
                            color: '#fff',
                            minWidth: '20%',
                            float: 'right',
                            borderRadius: '5px',
                            border: 'none'
                        }}>View Trip</button>
                    </div>
            ))}
        </div>
    )
}

export default Trips