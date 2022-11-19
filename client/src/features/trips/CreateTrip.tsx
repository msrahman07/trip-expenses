import { Formik, Field, Form, ErrorMessage } from 'formik';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';
import agent from '../../app/api/agent';
import { ITrip } from '../../app/models/trip';
import { closeModal } from '../../app/stores/modalStore'
import TripStore, { createTrip } from '../../app/stores/tripStore';

const CreateTrip = () => {
    const dispatch = useDispatch();
    const store = TripStore;
    
    const handleCreate = (values:ITrip) => {
        dispatch<any>(createTrip(values));
        dispatch(closeModal());
    }
    return (
        <>
            <h3>Create new trip</h3>
            <Formik
                initialValues={{ name: '', description: '' }}
                validationSchema={Yup.object({
                    name: Yup.string()
                        .max(15, 'Must be 15 characters or less')
                        .required('Required'),
                    description: Yup.string()
                        .required('Required'),

                })}
                onSubmit={(values, { setSubmitting }) => {
                    handleCreate(values)
                    setSubmitting(false);
                    // setTimeout(() => {
                    //     alert(JSON.stringify(values, null, 2));
                    //     setSubmitting(false);
                    // }, 400);
                }}
            >
                <Form className='form-group'>
                    <label htmlFor="name">Name</label>
                    <Field className='form-control' name="name" type="text" />
                    <p className='text-danger'><ErrorMessage name="name" /></p>

                    <label htmlFor="description">Description</label>
                    <Field className='form-control' name="description" type="text" />
                    <p className='text-danger'><ErrorMessage name="description" /></p>

                    <button type="submit" className='btn btn-outline-primary'>Submit</button>
                </Form>
            </Formik>
        </>
    )
}

export default CreateTrip