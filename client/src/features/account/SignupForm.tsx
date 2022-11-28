import { Formik, Field, Form, ErrorMessage } from 'formik';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import { IUser } from '../../app/models/user';
import { closeModal, openModal } from '../../app/stores/modalStore';
import { loadingUser, registerUser } from '../../app/stores/userStore';
import LoginForm from './LoginForm';

const SignupForm = () => {
    const dispatch = useDispatch();
    const loading = useSelector(loadingUser);

    useEffect(() => {
        if(!loading) {
            dispatch(closeModal());
        }
    }, [loading]);
    
    return (
        <>
            <h3>Signup Form</h3>
            <Formik
                initialValues={{ displayName: '', email: '', password: '' }}
                validationSchema={Yup.object({
                    displayName: Yup.string()
                        .max(15, 'Must be 15 characters or less')
                        .required('Required'),
                    email: Yup.string().email('Invalid email address').required('Required'),
                    password: Yup.string().required('Required'),
                })}
                onSubmit={(values:IUser, { setSubmitting }) => {
                    dispatch<any>(registerUser(values))
                    // setTimeout(() => {
                    //     alert(JSON.stringify(values, null, 2));
                    //     setSubmitting(false);
                    // }, 400);
                }}
            >
                <Form className='form-group'>
                    <label htmlFor="displayName">Name</label>
                    <Field className='form-control' name="displayName" type="text" />
                    <p className='text-danger'><ErrorMessage name="displayName" /></p>

                    <label htmlFor="email">Email Address</label>
                    <Field className='form-control' name="email" type="email" />
                    <p className='text-danger'><ErrorMessage name="email" /></p>

                    <label htmlFor="password">Password</label>
                    <Field className='form-control' name="password" type="password" />
                    <p className='text-danger'><ErrorMessage name="password" /></p>

                    <button type="submit" className='btn btn-outline-primary'>Register</button> or {" "}
                    <a onClick={() => dispatch(openModal(<LoginForm />))} 
                        style={{
                            color: '#222a37',
                            fontSize: '1.1em',
                            cursor: 'pointer',
                            textDecoration: 'underline'
                        }}
                    >Login</a>
                </Form>
            </Formik>
        </>
    )
}

export default SignupForm