import { Formik, Field, Form, ErrorMessage } from 'formik';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import { closeModal, openModal } from '../../app/stores/modalStore';
import { loadingUser, loginUser } from '../../app/stores/userStore';
import SignupForm from './SignupForm';

const LoginForm = () => {
    const dispatch = useDispatch();
    const loading = useSelector(loadingUser);
    
    useEffect(() => {
        if(!loading) {
            dispatch(closeModal());
            console.log(loading)
        }
    }, [loading]);

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
                    dispatch<any>(loginUser(values))
                    // setTimeout(() => {
                    //     alert(JSON.stringify(values, null, 2));
                    //     setSubmitting(false);
                    // }, 400);
                }}
            >
                <Form className='form-group'>
                    <label htmlFor="email">Email Address</label>
                    <Field className='form-control' name="email" type="email" />
                    <p className='text-danger'><ErrorMessage name="email" /></p>

                    <label htmlFor="password">Password</label>
                    <Field className='form-control' name="password" type="password" />
                    <p className='text-danger'><ErrorMessage name="password" /></p>

                    <button type="submit" className='btn btn-outline-primary'>Login</button> or {" "}
                    
                    <a onClick={() => dispatch(openModal(<SignupForm />))}
                        style={{
                            color: '#222a37',
                            fontSize: '1.1em',
                            cursor: 'pointer',
                            textDecoration: 'underline'
                        }}
                    >Sign Up</a>
                </Form>
            </Formik>
        </>
    )
}

export default LoginForm