import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../../app/stores/hooks';
import { currentTrip, getCurrentTrip } from '../../../app/stores/tripStore';
import AddAttendeeSection from './AddAttendeeSection';
import AddExpenses from './AddExpenses';
import GenerateExpenseReport from './GenerateExpenseReport';
import ShowExpenses from './ShowExpenses';

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
            <div className='col-sm-6'>
              <h3>{trip.name}</h3>
              {trip.description}
            </div>

            <div className='col-sm-6'>
              <button
                onClick={() => setMenu('addAttendees')}
                className={menu==='addAttendees' ? 'btn btn-primary' : 'btn btn-outline-primary'}
                style={{
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
                className={menu==='addExpenses' ? 'btn btn-primary' : 'btn btn-outline-primary'}
                style={{
                  minWidth: '80%',
                  float: 'right',
                  borderRadius: '5px',
                  border: 'none',
                  marginBottom: '10px'
                }}>
                Add Expenses
              </button>
              <button
                onClick={() => setMenu('showExpenses')}
                className={menu==='showExpenses' ? 'btn btn-primary' : 'btn btn-outline-primary'}
                style={{
                  minWidth: '80%',
                  float: 'right',
                  borderRadius: '5px',
                  border: 'none',
                  marginBottom: '10px'
                }}>
                Show Expenses
              </button>
              <button
                onClick={() => setMenu('expensesReport')}
                className={menu==='expensesReport' ? 'btn btn-primary' : 'btn btn-outline-primary'}
                style={{
                  minWidth: '80%',
                  float: 'right',
                  borderRadius: '5px',
                  border: 'none',
                  marginBottom: '10px'
                }}>
                Expense Report
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
          {menu === 'showExpenses' &&
            <div>
              <ShowExpenses />
            </div>
          }
          {menu === 'expensesReport' &&
            <div>
              <GenerateExpenseReport />
            </div>
          }
        </>
      }
    </>

  )
}

export default TripDetails