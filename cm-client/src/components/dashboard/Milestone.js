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
    const milestones = props.milestones && props.milestones.map(ms => (
        <tr key={ms._id}>
            <td>{ms.title}</td>
            <td className='hide-sm'>{ms.description}</td>
            <td className='hide-sm'>
                <Moment format="DD/MM/YY">{ms.dateAcheived}</Moment>
            </td>
            <td>{ms.privacy ? 'Private' : 'Public' }</td>
            <td>
                <button onClick={() => props.deleteMilestone(ms._id)} className="btn btn-danger">Remove</button>
            </td>
        </tr>
    ));
    return (
        <Fragment>
            <h2 className="my-2">Personal Milestones</h2>

            <table className="table table-striped table-light">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th className='hide-sm'>Description</th>
                        <th className='hide-sm'>Date</th>
                        <th className='hide-sm'>Status</th>
                        <th></th>
                    </tr>  
                </thead>
                <tbody>
                    {milestones}
                </tbody>
            </table>

            
        </Fragment>
    )
}

Milestone.propTypes = {
    milestones: PropTypes.array.isRequired,
    deleteMilestone: PropTypes.func.isRequired,
}

export default connect(null, { deleteMilestone })(Milestone)
