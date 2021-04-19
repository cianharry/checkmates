// Importing React, Fragment as container component, and useState for state management using hooks
import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { setAlert } from '../../actions/alerts';
import { register } from '../../actions/auth';
import PropTypes from 'prop-types';

const Register = (props) => {
    // setting the initial state of the formData constant
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password2: ''
    });
    // Destructuring formData to access fields
    const { name, email, password, password2 } = formData;
    // using a spread operator to copy the form data
    // using the onChange target to define what formData input filed should be updated
    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });
    const onSubmit = async e => {
        e.preventDefault();
        // Checking that the passwords match
        if(password !== password2) {
            // applying the alert reducer, configuring the message and alert type
            props.setAlert('Passwords do not match', 'danger');
            console.log('Passwords do not match');
        }
        else {
            // call the register action using the destructured form data
            props.register({ name, email, password });
            console.log('Success');
            /* ------ TEST --------
            Req_Id:      R03 - Registration Validation
            Test_Id:     T023

                const newUser = {
                name,
                email,
                password
            }
            //
            try {
                // configuring the headers for the request
                const config = {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
                // configuring the request body to be sent
                const body = JSON.stringify(newUser);
                // await the axios post request to backend api
                const res = await axios.post('/api/users', body, config);
                // log the response data - json web token
                console.log(res.data)
            } catch (error) {
                console.error(error.response.data);
            }
            */
            
        }
    }
    return (
        <Fragment>
            <div className="h-100 col-md-10 p-3 mx-auto ">
                <div className="text-center mt-4">
                    <form className="form-signin" onSubmit={e => onSubmit(e)}>
                        <h1 className="large mb-3">Register with Checkmates</h1>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={name}
                            onChange={e => onChange(e)}
                            className="form-control"
                            placeholder="Full name"
                            //required
                            />
                        <input
                            type="email"
                            id="inputEmail"
                            name="email"
                            value={email}
                            onChange={e => onChange(e)}
                            className="form-control"
                            placeholder="Email address"
                            //required
                            autoFocus=""/>
                        <input
                            type="password"
                            id="inputPassword"
                            name="password"
                            value={password}
                            onChange={e => onChange(e)}
                            className="form-control"
                            placeholder="Password"
                            //required
                            //minLength="8"
                            />
                        <input
                            type="password"
                            id="inputPassword2"
                            name="password2"
                            value={password2}
                            onChange={e => onChange(e)}
                            className="form-control"
                            placeholder="Confirm password"
                            //required
                            //minLength="8"
                            />
                        
                        <button
                            className="btn btn-lg btn-primary btn-block mt-5"
                            type="submit"
                            value="Register">Register</button>
                            <p className="mt-2">
                            Already have an account?
                        </p>
                        <Link className="" to='/login'>Login</Link>
                        <p className="mt-5 mb-3">Checkmates © 2020-2021</p>
                    </form>
                </div>
            </div>
        </Fragment>
        
    )
}
// adding to prop types
Register.propTypes = {
    setAlert: PropTypes.func.isRequired,
    register: PropTypes.func.isRequired,
};

// this allows access to props.setAlert and props.register action
export default connect(null, { setAlert, register })(Register);
