import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { openModal } from '../stores/modalStore';
import LoginForm from '../../features/account/LoginForm';
import SignupForm from '../../features/account/SignupForm';
import CreateTrip from '../../features/trips/CreateTrip';
import { currentUser, getCurrentUser, loadingUser, logoutUser } from '../stores/userStore';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../stores/hooks';

const NavBar = () => {
    const dispatch = useAppDispatch();
    const userLoading = useAppSelector(loadingUser);
    const user = useAppSelector(currentUser);
    
    useEffect(() => {
        return(() => {
            dispatch(getCurrentUser());
        })
    }, []);

    return (
        <Navbar expand="lg" style={{
            backgroundColor: "#222a37", marginBottom: '20px'
        }} variant="dark" sticky='top'>
            <Container>
                <Navbar.Brand href="/">Trip Expenses</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="/">Home</Nav.Link>
                        {(!userLoading) ?
                            <>
                                <Nav.Link onClick={() => dispatch(openModal(<CreateTrip />))}>Create New Trip</Nav.Link>
                                <Nav.Link onClick={() => dispatch<any>(logoutUser())}>Logout</Nav.Link>
                                <Nav.Link onClick={() => dispatch(openModal(<LoginForm />))}>{user.displayName}</Nav.Link>
                            </>
                            :
                            <>
                                <Nav.Link onClick={() => dispatch(openModal(<LoginForm />))}>Create New Trip</Nav.Link>
                                <Nav.Link onClick={() => dispatch(openModal(<LoginForm />))}>Login</Nav.Link>
                                <Nav.Link onClick={() => dispatch(openModal(<SignupForm />))}>Signup</Nav.Link>
                            </>
                        }
                        {/* <Nav.Link onClick={() => dispatch(openModal(<CreateTrip />))}>Create New Trip</Nav.Link>
                        <Nav.Link onClick={() => dispatch(openModal(<LoginForm />))}>Login</Nav.Link>
                        <Nav.Link onClick={() => dispatch(openModal(<SignupForm />))}>Signup</Nav.Link> */}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default NavBar