import React from 'react'
import { Link } from 'react-router-dom'
import './Dashboard.css'

const Actions = () => {
    return (
        <div>
            <div className='actions-div'>
                <Link
                    to='/edit-profile'
                    className='actions-container'>
                    <i className="fas fa-pencil-alt primary-col"/> 
                    <h5 className='hide-sm'>edit profile</h5>
                </Link>
                <Link
                    to='/add-milestone'
                    className='actions-container'>
                    <i className="fas fa-book primary-col"/> 
                    <h5 className='hide-sm'>mile-stones</h5>
                </Link>
                <Link
                    to='/checkins'
                    className='actions-container'>
                    <i className="fas fa-calendar-check primary-col"/> 
                    <h5 className='hide-sm'>check-ins</h5>
                </Link>
            </div>
            <div className='actions-div2'>
                <Link
                    to='/chats'
                    className='actions-container2'>
                    <i className="fas fa-comments secondary-col"/> 
                    <h5 className='hide-sm'>chat</h5>
                </Link>
                <Link
                    to='/profiles'
                    className='actions-container2'>
                    <i className="fas fa-users secondary-col"/> 
                    <h5 className='hide-sm'>circle</h5>
                </Link>
                <Link
                    to='/checkins/all'
                    className='actions-container2'>
                    <i className="fas fa-link secondary-col"/> 
                    <h5 className='hide-sm'>check-mates</h5>
                </Link>
            </div>
        </div>
    )
}

export default Actions

