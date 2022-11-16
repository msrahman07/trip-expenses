import { Formik, Field, Form, ErrorMessage } from 'formik';
import React from 'react'
import * as Yup from 'yup';

const LoginForm = () => {
    return (
        <>
            <h3>Login Form</h3>
            <Formik
                initialValues={{ email: '', password: '' }}
                validationSchema={Yup.object({
                    email: Yup.string().email('Invalid email address').required('Required'),
                    password: Yup.string().required('Required'),
                })}
                onSubmit={(values, { setSubmitting }) => {
                    setTimeout(() => {
                        alert(JSON.stringify(values, null, 2));
                        setSubmitting(false);
                    }, 400);
                }}
            >
                <Form className='form-group'>
                    <label htmlFor="email">Email Address</label>
                    <Field className='form-control' name="email" type="email" />
                    <p className='text-danger'><ErrorMessage name="email" /></p>

                    <label htmlFor="password">Password</label>
                    <Field className='form-control' name="password" type="text" />
                    <p className='text-danger'><ErrorMessage name="password" /></p>

                    <button type="submit" className='btn btn-primary'>Submit</button>
                </Form>
            </Formik>
        </>
    )
}

export default LoginForm