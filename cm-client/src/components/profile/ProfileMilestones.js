import React from 'react'
import PropTypes from 'prop-types'
import Moment from 'react-moment'

const ProfileMilestones = ({ milestones: { title, description, privacy, dateAcheived } }) => {
    return (
        <div className="col-md-8 m-auto text-center">
            <div className="h-100 mb-2 p-5 bg-light border rounded-3">
                <h2>{title}</h2>
                <p>{description}</p>
                <p><strong>Date Acheived: </strong><Moment format="DD/MM/YY">{dateAcheived}</Moment></p>
                <p>{privacy ? 'private' : 'public'}</p>
                <button className="btn btn-secondary" type="button">Congratulate</button>
            </div>
        </div>
    )
}

ProfileMilestones.propTypes = {
    milestones: PropTypes.object.isRequired
}

export default ProfileMilestones
