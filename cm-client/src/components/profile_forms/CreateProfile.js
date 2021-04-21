import React, { Fragment, useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

const CreateProfile = props => {
    // initializing from data 
    const [formData, setFormData] = useState({
        age: 0,
        gender: '',
        bio: '',
        youtube: '',
        instagram: '',
        facebook: '',
        twitter: ''
    })
    // used to toggle the social media input fields
    const [displaySocial, toggleSocial] = useState(false);

    // destructuring constants from form data
    const {
        age,
        gender,
        bio,
        youtube,
        instagram,
        facebook,
        twitter
    } = formData
    // using a spread operator to copy the form data
    // using the onChange target to define what formData input filed should be updated
    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });
    return (
        <Fragment>
            <h1 className="large">
                Create Your Checkmates Profile
            </h1>
            
            
            <form className="form">
            <p style={{color: 'white'}} className="lead">
                <i  className="fas fa-user"></i> Let's start by getting some basic profile information to help with your experience
            </p>
                <p>
                    Give us an idea of where you are at in your personal journey with mental health
                </p>
                <div className="form-group">
                    <select onChange={e => onChange(e)} className='form-control' name="experience">
                        <option value="0">* Select Experience</option>
                        <option value="Beginner">Beginner</option>
                        <option value="Intermediate">Intermediate</option>
                        <option value="Experienced">Experienced</option>
                    </select>
                    
                </div>
                <div className="form-group">
                    <p className="lead">
                        Age
                    </p>
                    <input
                        className="form-control"
                        type="number"
                        placeholder="Age"
                        name="age"
                        value={age}
                        onChange={e => onChange(e)} />
                </div>
                <div className="form-group">
                    <p className="lead">
                        Gender
                    </p>
                    <input
                        className="form-control"
                        type="text"
                        placeholder=""
                        name="gender"
                        value={gender}
                        onChange={e => onChange(e)} />
                <small className="form-text">
                    This is used solely for analytics purposes and not for classification of any sort
                </small>
                </div>
                <div className="form-group">
                    <p className="lead">
                        Personal Bio
                    </p>
                    <textarea
                        className="form-control"
                        type="text"
                        placeholder="Please provide a bio for your profile"
                        name="bio"
                        value={bio}
                        onChange={e => onChange(e)} />
                </div>
                <div className="my-2">
                    <button onClick={() => toggleSocial(!displaySocial)} type="button" className="btn btn-secondary">
                        Add Social Links
                    </button>
                    <br/>
                    <span>Optional</span>
                </div>

                {displaySocial && <Fragment>
                    <div className="form-group social-input">
                        <i className="fab fa-twitter fa-2x"></i>
                        <input
                            className="form-control"
                            type="text"
                            placeholder="Twitter URL"
                            name="twitter"
                            value={twitter}
                            onChange={e => onChange(e)} />
                        </div>

                        <div className="form-group social-input">
                            <i className="fab fa-facebook fa-2x"></i>
                            <input
                                className="form-control"
                                type="text"
                                placeholder="Facebook URL"
                                name="facebook"
                                value={facebook}
                                onChange={e => onChange(e)} />
                        </div>

                        <div className="form-group social-input">
                            <i className="fab fa-youtube fa-2x"></i>
                            <input
                                className="form-control"
                                type="text"
                                placeholder="YouTube URL"
                                name="youtube"
                                value={youtube}
                                onChange={e => onChange(e)} />
                        </div>

                        <div className="form-group social-input">
                            <i className="fab fa-instagram fa-2x"></i>
                            <input
                                className="form-control"
                                type="text"
                                placeholder="Instagram URL"
                                name="instagram"
                                value={instagram}
                                onChange={e => onChange(e)} />
                        </div>
                    </Fragment>
                }

                
                <input type="submit" className="btn btn-secondary my-1" />
                <br/>
                <a className="btn btn-light my-1" href="dashboard.html">Go Back</a>
            </form>
            
        </Fragment>
    )
}

CreateProfile.propTypes = {

}

export default CreateProfile
