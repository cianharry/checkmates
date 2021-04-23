import React, { Fragment, useState, useEffect } from 'react'
import { Link, withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { createUserProfile, getCurrentUser } from '../../actions/profile'

const EditProfile = (props) => {
    // initializing from data 
    const [formData, setFormData] = useState({
        experience: '',
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
    //
    useEffect(() => {
        // get the current user profile using the profile action
        props.getCurrentUser()
        // if the component is loading or any of the fields arent present in the state then show blank
        // otherwise show the existing state profile feilds 
        setFormData({
            experience: props.profile.loading || !props.profile.profile.experience ? '' : props.profile.profile.experience,
            age: props.profile.loading || !props.profile.profile.age ? 0 : props.profile.profile.age,
            gender: props.profile.loading || !props.profile.profile.gender ? '' : props.profile.profile.gender,
            bio: props.profile.loading || !props.profile.profile.bio ? '' : props.profile.profile.bio,
            youtube: props.profile.loading || !props.profile.profile.social ? '' : props.profile.profile.social.youtube,
            instagram: props.profile.loading || !props.profile.profile.social ? '' : props.profile.profile.social.instagram,
            facebook: props.profile.loading || !props.profile.profile.social ? '' : props.profile.profile.social.facebook,
            twitter: props.profile.loading || !props.profile.profile.social ? '' : props.profile.profile.social.twitter,
        })
        // dependant on props.loading 
    }, [props.profile.loading])

    // destructuring constants from form data
    const {
        experience,
        age,
        gender,
        bio,
        youtube,
        instagram,
        facebook,
        twitter
    } = formData
    // using a spread operator to copy the form data
    // using the onChange target to define what formData input feildd should be updated
    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });
    // calling the create profile action on form submission
    const onSubmit = async e => {
        e.preventDefault();
        // setting edit to true to signify its an edit action
        // Req_Id: R0 
        // Test_Id: T039
        props.createUserProfile(formData, props.history, true)
    }

    return (
        <Fragment>
            <h1 className="large">
                Create Your Checkmates Profile
            </h1>
            
            
            <form className="form" onSubmit={e => onSubmit(e)}>
            <p className="lead">
                <i  className="fas fa-user"></i> Let's start by getting some basic profile information to help with your experience
            </p>
                <p>
                    Give us an idea of where you are at in your personal journey with mental health
                </p>
                <div className="form-group">
                    <select
                     onChange={e => onChange(e)}
                     className='form-control'
                     name="experience"
                     value={experience} >
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
                    <button onClick={() => toggleSocial(!displaySocial)} type="button" className="btn btn-secondary mr-2">
                        Add Social Links
                    </button>
                    <span>Optional - do not share social links if you are not comfortable with it or are looking for a more private experience</span>
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
                <input type="submit" className="btn btn-secondary my-1 mr-1" />
                <Link className="btn btn-light my-1" to="/dashboard">Go Back</Link>
            </form>
            
        </Fragment>
    )
}

EditProfile.propTypes = {
    createUserProfile: PropTypes.func.isRequired,
    getCurrentUser: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    profile: state.profile
})

// withRouter allows us to pass in the history object for redirect
export default connect(mapStateToProps,{ createUserProfile, getCurrentUser })(withRouter(EditProfile))
