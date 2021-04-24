import React, { Fragment, useState } from 'react'
import { Link, withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { addMilestone } from '../../actions/profile'

const AddMilestone = props => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        privacy: false
    })
    // destructuring the from data
    const {
        title,
        description,
        privacy
    } = formData
    // using a spread operator to copy the form data
    // using the onChange target to define what formData input feild should be updated
    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });
    // calling the add milestone action on form submission
    const onSubmit = async e => {
        e.preventDefault();
        // Req_Id:  R0 
        // Test_Id: 40
        props.addMilestone(formData, props.history)
    }

    return (
        <Fragment>
            <h1 className="large">
                Add Milestone to Profile
            </h1>
            
            <form className="form" onSubmit={e => onSubmit(e)}>
                <p style={{color: ''}} className="lead">
                    <i  className="fas fa-user"></i> {'  '} Milestones help acknowledge personal acheivements along your journey with Checkmates
                </p>
                <div className="form-group">
                    <p className="lead">
                        Title
                    </p>
                    <input
                        className="form-control"
                        type="text"
                        placeholder="Milestone Title"
                        name="title"
                        value={title}
                        onChange={e => onChange(e)}
                        required
                         />
                </div>
                <div className="form-group">
                    <p className="lead">
                        Description
                    </p>
                    <input
                        className="form-control"
                        type="text"
                        placeholder="Milestone Description"
                        name="description"
                        value={description}
                        onChange={e => onChange(e)}
                        required 
                        />
                    <small className="form-text">
                        Describe the reason for the milestone
                    </small>
                </div>
                
                <div className="form-group">
                    <p className='pr-2'>
                    <input
                        type="checkbox"
                        onChange={e => setFormData({ ...formData, privacy: !privacy })}
                        checked={privacy}
                        name="privacy"
                        value={privacy}/>
                        {' '}<i className="fas fa-eye-slash"></i>{' - '} Select if you want this milestone to be private and not visible on your profile
                    </p>
                </div>

                <input type="submit" className="btn btn-secondary my-1 mr-1" />
                <Link className="btn btn-light my-1" to="/dashboard">Go Back</Link>
            </form>
        </Fragment>
    )
}

AddMilestone.propTypes = {
    addMilestone: PropTypes.func.isRequired,
}

export default connect(null, {addMilestone})(withRouter(AddMilestone))
