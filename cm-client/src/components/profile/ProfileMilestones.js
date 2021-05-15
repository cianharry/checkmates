import React from 'react'
import PropTypes from 'prop-types'
import Moment from 'react-moment'

const ProfileMilestones = ({ milestones: { title, description, privacy, dateAcheived } }) => {
    return (
        <div className="container">
            <div className="milestone-container p-5">
                <h2>{title}</h2>
                <p className='lead check-font'>{description}</p>
                <p><strong>Acheived: </strong><Moment format="DD/MM/YY">{dateAcheived}</Moment></p>
                <p>{privacy}</p>
                <button className="btn btn-primary" type="button">Congratulate</button>
            </div>
        </div>
    )
}

ProfileMilestones.propTypes = {
    milestones: PropTypes.object.isRequired
}

export default ProfileMilestones
