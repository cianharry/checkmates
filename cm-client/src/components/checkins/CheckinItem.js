import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import Moment from 'react-moment'
import ProfileIMG from '../../assets/Profile.png'


const CheckinItem = ({ auth, checkin: { _id, title, emotion, intensity, maintext, name, user, avatar, reactions, comments, date } }) => {
    return (
        <Fragment>
            <div className="container checkin-container bg-bark d-flex">
                <div className='pt-4 pr-4'>
                    <img src={ProfileIMG} alt="" className="round-img"/>
                    <h4>{name}</h4>
                </div>
                <div className="checkin-body p-2 shadow float-right bg-light ">
                    <h3>{title}</h3>
                    <h4><strong>Emotion: </strong>{emotion}</h4>
                    <h4><strong>Intensity: </strong>{intensity}</h4>
                    <p>{maintext}</p>
                    <button className="btn btn-secondary">
                        <i class="fas fa-heart"></i>
                        {reactions.length > 0 && (
                            <span className='primary-col'>{' '}{reactions.length}</span>
                        )}
                    </button>
                    <Link to={`/checkin/${_id}`} className="btn btn-secondary">
                        <i class="far fa-comment-dots"></i> Discussion
                        {comments.length > 0 && (
                            <span className='primary-col'>{' '}{comments.length}</span>
                        )}
                    </Link>
                    <button className="btn btn-secondary">
                        <i class="fas fa-link"></i>{' '}
                        Private Chat
                    </button>
                    {/* Checking that the checkin user is the current user */}
                    {!auth.loading && user === auth.user._id && (
                        <button className="btn btn-danger float-right">
                            <i className="fas fa-times"></i>
                        </button>
                    )}
                    <p className="text-muted">Checkin date: <Moment format="DD/MM/YY">{date}</Moment></p>
                </div>
               
            </div>
            
        </Fragment>
    )
}

CheckinItem.propTypes = {
    checkin: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps, {  })(CheckinItem)
