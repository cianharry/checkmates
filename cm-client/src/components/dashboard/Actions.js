import React from 'react'
import { Link } from 'react-router-dom'

const Actions = () => {
    return (
        <div>
            <Link to='/edit-profile' className='btn btn-secondary'><i className="fas fa-pencil-alt"></i> Edit Profile</Link>
            <Link to='/add-milestone' className='btn btn-secondary'><i className="fas fa-book"></i> Milestones</Link>
            <Link to='/checkins' className='btn btn-secondary'><i className="fas fa-calendar-check"></i> Checkins</Link>
        </div>
    )
}

export default Actions

