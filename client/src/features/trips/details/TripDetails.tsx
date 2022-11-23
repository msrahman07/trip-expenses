import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../../app/stores/hooks';
import { currentTrip, getCurrentTrip } from '../../../app/stores/tripStore';
import AddAttendeeSection from './AddAttendeeSection';
import AddExpenses from './AddExpenses';

const TripDetails = () => {
  const { tripId } = useParams();
  const trip = useAppSelector(currentTrip);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [menu, setMenu] = useState('addAttendees');

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
              <button
                onClick={() => setMenu('addAttendees')}
                style={{
                  backgroundColor: '#222a37',
                  color: '#fff',
                  minWidth: '80%',
                  float: 'right',
                  borderRadius: '5px',
                  border: 'none',
                  marginBottom: '10px'

                }}>
                Add Attendees
              </button>
              <button
                onClick={() => setMenu('addExpenses')}
                style={{
                  backgroundColor: '#222a37',
                  color: '#fff',
                  minWidth: '80%',
                  float: 'right',
                  borderRadius: '5px',
                  border: 'none',

                }}>
                Add Expenses
              </button>
            </div>
          </div>
          {menu === 'addAttendees' &&
            <div>
              <AddAttendeeSection tripId={parseInt(tripId!)} />
            </div>
          }
          {menu === 'addExpenses' &&
            <div>
              <AddExpenses />
            </div>
          }
        </>
      }
    </>

  )
}

export default TripDetails