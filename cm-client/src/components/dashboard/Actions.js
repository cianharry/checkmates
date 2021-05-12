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
                    <h3>edit profile</h3>
                </Link>
                <Link
                    to='/add-milestone'
                    className='actions-container'>
                    <i className="fas fa-book primary-col"/> 
                    <h3>milestones</h3>
                </Link>
                <Link
                    to='/checkins'
                    className='actions-container'>
                    <i className="fas fa-calendar-check primary-col"/> 
                    <h3>check-ins</h3>
                </Link>
            </div>
            <div className='actions-div2'>
                <Link
                    to='/chats'
                    className='actions-container2'>
                    <i className="fas fa-link secondary-col"/> 
                    <h3>chat</h3>
                </Link>
                <Link
                    to='/profiles'
                    className='actions-container2'>
                    <i className="fas fa-users secondary-col"/> 
                    <h3>circle</h3>
                </Link>
                <Link
                    to='/checkins/all'
                    className='actions-container2'>
                    <i className="fas fa-link secondary-col"/> 
                    <h3>check-mates</h3>
                </Link>
            </div>
        </div>
    )
}

export default Actions

