import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import Moment from 'react-moment'
import { addReaction, deleteCheckin } from '../../actions/checkin'



const CheckinItem = ({ addReaction, deleteCheckin, auth, showButtons, checkin: { _id, title, emotion, intensity, maintext, privacy, name, user, avatar, reactions, comments, date } }) => {
    return (
        <Fragment>
            <div className="container checkin-container bg-bark d-flex">
                <div className='pt-4 pr-4'>
                    <Link to={`profile/${user}`}>
                        <img src={avatar} alt="" className="round-img"/>
                        <h4 className='primary-col text-center p-2'>{name}</h4>
                    </Link>
                </div>
                <div className="checkin-body p-2 float-right bg-light ">
                    <h3 className='primary-col'>{title}</h3>
                    <h4><strong>Emotion: </strong>{emotion}</h4>
                    <h4><strong>Intensity: </strong>{intensity}</h4>
                    <h4><strong>Privacy: </strong>{privacy ? 'Private' : 'Public'}</h4>
                    <p>{maintext}</p>
                    {/*
                    ReqId:  R0
                    TestId: T048    
                    Adding support reaction to freinds checkin
                    */}
                    {showButtons ? 
                    <Fragment>
                        <button onClick={e => addReaction(_id)} className="btn btn-secondary">
                        <i className="fas fa-heart"></i>
                        {reactions.length > 0 && (
                            <span className='primary-col'>{' '}{reactions.length}</span>
                        )}
                    </button>
                    <Link to={`/checkin/${_id}`} className="btn btn-secondary">
                        <i className="far fa-comment-dots"></i> Discussion
                        {comments.length > 0 && (
                            <span className='primary-col'>{' '}{comments.length}</span>
                        )}
                    </Link>
                    </Fragment> : ''}
                    
                    <button className="btn btn-secondary">
                        <i className="fas fa-link"></i>{' '}
                        Private Chat
                    </button>
                    {/* Checking that the checkin user is the current user
                        ReqId:  R0 
                        TestId: T050
                     */}
                    {!auth.loading && user === auth.user._id && (
                        <button onClick={e => deleteCheckin(_id)} className="btn btn-danger float-right">
                            <i className="fas fa-times"></i>
                        </button>
                    )}
                    <p className="text-muted">Checkin date: <Moment format="DD/MM/YY">{date}</Moment></p>
                </div>
               
            </div>
            
        </Fragment>
    )
}

CheckinItem.defaultProps = {
    showButtons: true
}

CheckinItem.propTypes = {
    checkin: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    addReaction: PropTypes.func.isRequired,
    deleteCheckin: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps, { addReaction, deleteCheckin })(CheckinItem)