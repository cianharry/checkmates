import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

const ProfileItem = ({ profile: {
    user: { _id, name, avatar, },
    experience,
    gender,
    bio
}}) => {
    // creating the invidual profile component to be displayed in the profiles component
    return (
        <div style={{opacity: 0.9}} className='profile-container p-1'>
            <div style={{opacity: 1}} className="container">
                <img src={avatar} alt="profile pic" className="round-img"/>
                <div>
                    <h2>{name}</h2>
                    <p style={{color: '#33cccc'}} className="lead">Exp: {experience}</p>
                    <p><strong>Gender:</strong> {gender}</p>
                    <p><strong>Personal Bio</strong></p>
                    <p>{bio}</p>
                    <Link to={`/profile/${_id}`} className='btn btn-secondary' >
                        View Profile
                    </Link>
                </div>
            </div>
           
        </div>
        
    )
}

ProfileItem.propTypes = {
    profile: PropTypes.object,
}

export default ProfileItem
