import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify';
import { useAppDispatch, useAppSelector } from '../../../app/stores/hooks';
import { openModal } from '../../../app/stores/modalStore';
import { currentTrip, deleteTrip, getCurrentTrip } from '../../../app/stores/tripStore';
import { loadingUser } from '../../../app/stores/userStore';
import LoginForm from '../../account/LoginForm';
import AddAttendeeSection from './AddAttendeeSection';
import AddExpenses from './AddExpenses';
import GenerateExpenseReport from './GenerateExpenseReport';
import ShowExpenses from './ShowExpenses';

const TripDetails = () => {
  const { tripId } = useParams();
  const trip = useAppSelector(currentTrip);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [menu, setMenu] = useState('showExpenses');
  const userLoading = useAppSelector(loadingUser);
  const [deleted, setDeleted] = useState(false);

  useEffect(() => {
    // return (() => {
      // if(!deleted){
        dispatch(getCurrentTrip(parseInt(tripId!)))
      // }
    // })
  }, []);

  useEffect(() => {
    if(deleted) {
      navigate('/trips/');
    }
    return (() => {
      
    })
  }, [deleted]);

  const handleDelete = async () => {
    try {
      await dispatch(deleteTrip(trip.id!)).then(() => {
        navigate('/');
      })
    } catch (error) {
      toast.error("unable to delete trip")
    }
  }
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
              <div>{trip.description}</div>
              {(!userLoading) && 
              <button type="button" className="btn btn-danger btn-sm" style={{
                  float: 'left'
                }}
                onClick={handleDelete}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                  <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                  <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" />
                </svg> Delete
              </button>
            }
            </div>

            <div className='col-sm-6'>
              <button
                onClick={(userLoading) ? () => dispatch(openModal(<LoginForm />)) : () => setMenu('addAttendees')}
                className={menu === 'addAttendees' ? 'btn btn-primary' : 'btn btn-outline-primary'}
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
                onClick={(userLoading) ? () => dispatch(openModal(<LoginForm />)) : () => setMenu('addExpenses')}
                className={menu === 'addExpenses' ? 'btn btn-primary' : 'btn btn-outline-primary'}
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
                className={menu === 'showExpenses' ? 'btn btn-primary' : 'btn btn-outline-primary'}
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
                className={menu === 'expensesReport' ? 'btn btn-primary' : 'btn btn-outline-primary'}
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