import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

const ProfileItem = ({ profile: {
    user: { _id, name, avatar, },
    experience,
    age,
    gender,
    bio
}}) => {
    // creating the invidual profile component to be displayed in the profiles component
    return (
        <div className='profile-container'>
            <div className="profile-item-container">
                <img src={avatar} alt="profile pic" className="round-img"/>
                <div>
                    <h2 className='check-font'>{name}</h2>
                    <h4>{age}</h4>
                    <Link to={`/profile/${_id}`} className='btn btn-primary' >
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
