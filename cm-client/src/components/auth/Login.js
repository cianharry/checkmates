// Importing React, Fragment as container component, and useState for state management using hooks
import React, { Fragment, useState } from 'react'
import { Link } from 'react-router-dom'

const Login = () => {
    // setting the initial state of the formData constant
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    // Destructuring formData to access fields
    const { email, password } = formData;
    // using a spread operator to copy the form data
    // using the onChange target to define what formData input filed should be updated
    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });
    const onSubmit = async e => {
        e.preventDefault();
        console.log('Success');
    }

    return (
        <Fragment>
            <div className="h-100 col-md-10 p-3 mx-auto ">
                <div className="text-center mt-4">
                    <form className="form-signin" onSubmit={e => onSubmit(e)}>
                        <h1 className="large mb-3">Login to Checkmates</h1>
                        
                        <input
                            type="email"
                            id="inputEmail"
                            name="email"
                            value={email}
                            onChange={e => onChange(e)}
                            className="form-control"
                            placeholder="Email address"
                            required
                            autoFocus=""/>
                            
                        <input
                            type="password"
                            id="inputPassword"
                            name="password"
                            value={password}
                            onChange={e => onChange(e)}
                            className="form-control"
                            placeholder="Password"
                            required
                            minLength="8"/>
                        
                        <button
                            className="btn btn-lg btn-primary btn-block mt-5"
                            type="submit"
                            value="Login">Login</button>
                        <p className="mt-2">
                            Don't have an account?
                        </p>
                        <Link className="" to='/register'>Register now</Link>
                        <p className="mt-5 mb-3">Checkmates © 2020-2021</p>
                    </form>
                </div>
            </div>
        </Fragment>
    )  
}

export default Login
