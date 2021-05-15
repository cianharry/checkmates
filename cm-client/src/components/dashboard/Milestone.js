import React, {Fragment} from 'react'
import PropTypes from 'prop-types'
// REFERENCE - https://www.npmjs.com/package/react-moment
import Moment from 'react-moment'
import { connect } from 'react-redux'
import { deleteMilestone } from '../../actions/profile'


const Milestone = props => {
    // if milestones exist each one is being map to its own row in the table
    // Req_Id:      R - Display Profile Milestones
    // Test_Id:     T042
    return (
        <Fragment>
            <div className='container text-center'>
                <h1 className="my-2 text-center check-font">Your Milestones</h1>
                {props.milestones && props.milestones.map(ms => (
                    <div key={ms._id} className="milestones-div">
                        <div className="milestones-container">
                            <i  className="fas fa-medal"></i>
                            <h4><strong className='primary-col'>Title:</strong> {ms.title}</h4>
                            <p className="lead check-font">{ms.description}</p>
                            <p className="lead primary-col">
                                <Moment format="DD/MM/YY">{ms.dateAcheived}</Moment>
                            </p>
                            <p>
                                {ms.privacy ? <i className="fas fa-eye-slash"></i> : <i className="fas fa-eye"></i>}
                            </p>
                            <button onClick={() => props.deleteMilestone(ms._id)} className="btn btn-danger">Remove</button>
                        </div>
                    </div>
                ))}    
            </div>
        </Fragment>
    )
}

Milestone.propTypes = {
    milestones: PropTypes.array.isRequired,
    deleteMilestone: PropTypes.func.isRequired,
}

export default connect(null, { deleteMilestone })(Milestone)
