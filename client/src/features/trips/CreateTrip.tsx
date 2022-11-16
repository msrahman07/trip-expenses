import { Formik, Field, Form, ErrorMessage } from 'formik';
import React from 'react'
import * as Yup from 'yup';

const CreateTrip = () => {
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
                        .max(15, 'Must be 15 characters or less')
                        .required('Required'),

                })}
                onSubmit={(values, { setSubmitting }) => {
                    setTimeout(() => {
                        alert(JSON.stringify(values, null, 2));
                        setSubmitting(false);
                    }, 400);
                }}
            >
                <Form className='form-group'>
                    <label htmlFor="name">Name</label>
                    <Field className='form-control' name="name" type="text" />
                    <p className='text-danger'><ErrorMessage name="name" /></p>

                    <label htmlFor="description">description</label>
                    <Field className='form-control' name="description" type="text" />
                    <p className='text-danger'><ErrorMessage name="description" /></p>

                    <button type="submit" className='btn btn-primary'>Submit</button>
                </Form>
            </Formik>
        </>
    )
}

export default CreateTrip