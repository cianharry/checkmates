import React, { useState, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { createCheckin } from '../../actions/checkin'
import { Link } from 'react-router-dom'

const CheckinForm = ({ createCheckin }) => {

    const [formData, setFormData] = useState({
        title: '',
        emotion: '',
        intensity: 0,
        maintext: '',
        privacy: true
    })
     // destructuring constants from form data
     const {
        title,
        emotion,
        intensity,
        maintext,
        privacy
    } = formData
    // using a spread operator to copy the form data
    // using the onChange target to define what formData input feild should be updated
    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });
    // calling the create checkin action on form submission
    const onSubmit = async e => {
        e.preventDefault();
        // Req_Id: R0 
        // Test_Id: T051
        createCheckin(formData)
        // resetting the checkin form data
        setFormData({
            title: '',
            emotion: '',
            intensity: 0,
            maintext: '',
            privacy: true
        })
    }

    return (
        <Fragment>
            <h1 className="large">
                Create Checkin
            </h1>
            
            
            <form className="form" onSubmit={e => onSubmit(e)}>
                <p className="lead">
                    <i  className="fas fa-user"></i> Take a deep breath and focus on you for the next few minutes...
                </p>
                <div className="form-group">
                    <p className="lead">
                        Checkin Title
                    </p>
                    <input
                        className="form-control"
                        type="text"
                        placeholder=""
                        name="title"
                        value={title}
                        required
                        onChange={e => onChange(e)} />
                </div>
                <p>
                    Select the primary emotions that best describes how you are feeling
                </p>
                <div className="form-group">
                    <select
                     onChange={e => onChange(e)}
                     className='form-control'
                     required
                     name="emotion"
                     value={emotion} >
                        <option value="0">* Select Primary Emotion</option>
                        <option value="Anger">Anger</option>
                        <option value="Anticipation">Anticipation</option>
                        <option value="Disgust">Disgust</option>
                        <option value="Fear">Fear</option>
                        <option value="Joy">Joy</option>
                        <option value="Sadness">Sadness</option>
                        <option value="Surprise">Surprise</option>
                        <option value="Trust">Trust</option>
                    </select>
                    
                </div>
                <div className="form-group">
                    <p className="lead">
                        Intensity
                    </p>
                    <input
                        className="form-control"
                        type="number"
                        placeholder="Emotion intensity"
                        required
                        name="intensity"
                        value={intensity}
                        onChange={e => onChange(e)} />
                </div>
                <div className="form-group">
                    <p className="lead">
                        Checkin Entry
                    </p>
                    <textarea
                        className="form-control"
                        type="text"
                        placeholder="Be honest and open with yourself"
                        name="maintext"
                        value={maintext}
                        onChange={e => onChange(e)} />
                </div>

                <div className="form-group">
                    <p className='pr-2'>
                    <input
                        type="checkbox"
                        onChange={e => setFormData({ ...formData, privacy: !privacy })}
                        checked={privacy}
                        name="privacy"
                        value={privacy}/>
                        {' '}<i className="fas fa-eye-slash"></i>{' - '} Select if you want this checkin to be private and hidden from all users
                    </p>
                </div>
                
                <input type="submit" className="btn btn-secondary my-1 mr-1" />
                <Link className="btn btn-light my-1" to="/dashboard">Go Back</Link>
            </form>
        </Fragment>
    )
}

CheckinForm.propTypes = {
    createCheckin: PropTypes.func.isRequired,
}

export default connect(null, { createCheckin })(CheckinForm)
