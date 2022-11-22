import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../../app/stores/hooks';
import { currentTrip, getCurrentTrip } from '../../../app/stores/tripStore';
import AddAttendeeSection from './AddAttendeeSection';

const TripDetails = () => {
  const { tripId } = useParams();
  const trip = useAppSelector(currentTrip);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(getCurrentTrip(parseInt(tripId!)))
  }, []);

  return (

    <>
      {trip &&
      <>
        <div
          className='sec row'
          onClick={() => navigate(`/trips/${trip.id}`)}
        >
          <div className='col-6'>
            <h3>{trip.name}</h3>
            {trip.description}
          </div>

          <div className='col-6'>
            <button style={{
              backgroundColor: '#222a37',
              color: '#fff',
              minWidth: '80%',
              float: 'right',
              borderRadius: '5px',
              border: 'none'
            }}>Add Attendees</button>
          </div>
        </div>
        
          <div>
            <AddAttendeeSection tripId={parseInt(tripId!)}/>
          </div>
        </>
      }
    </>

  )
}

export default TripDetails