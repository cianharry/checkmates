import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import Moment from 'react-moment'
import { addReaction, deleteCheckin } from '../../actions/checkin'



const CheckinItem = ({ addReaction, personalCheckins, deleteCheckin, auth, showButtons, checkin: { _id, title, emotion, intensity, maintext, sentiment, magnitude, privacy, name, user, avatar, reactions, comments, date } }) => {
    return (
        <Fragment>
            <div className="checkin-container">
                {/* Checking that the checkin user is the current user
                    ReqId:  R0 
                    TestId: T050
                    */}
                    {!auth.loading && user === auth.user._id && (
                        <button onClick={e => deleteCheckin(_id)} className="btn btn-danger">
                            <i className="fas fa-times"></i>
                        </button>
                    )}
                <div className='pt-2 text-center'>
                    <Link to={`/profile/${user}`}>
                        <img src={avatar} alt="" className="round-img"/>
                        <h4 className='primary-col text-center pt-2'>{name}</h4>
                    </Link>
                    {personalCheckins ? 
                    <Fragment>
                        <h6 className='primary-col text-center p-2'><strong className='text-light' > Sentiment: </strong>{sentiment} <strong className='text-light'>, Magnitude: </strong>{magnitude}</h6>
                        <h4>{privacy ? <i className="fas fa-eye-slash primary-col"></i> : <i className="fas fa-eye"></i>}</h4> 
                    </Fragment> : ''} 
                    {/*
                    ReqId:  R0
                    TestId: T048    
                    Adding support reaction to freinds checkin
                    */}
                    {showButtons ? 
                    <Fragment>
                        <button onClick={e => addReaction(_id)} className="btn btn-primary">
                        <i className="fas fa-heart"></i>
                        {reactions.length > 0 && (
                            <span className=''>{' '}{reactions.length}</span>
                        )}
                        </button>
                        <Link to={`/checkin/${_id}`} className="btn btn-primary">
                            <i className="far fa-comment-dots"></i> Discussion
                            {comments.length > 0 && (
                                <span className=''>{' '}{comments.length}</span>
                            )}
                        </Link>
                    </Fragment> : ''}
                </div>
                {/*
                 * The layout for the notebook paper was sourced from:
                 * https://www.codesdope.com/blog/article/getting-notebook-paper-effect-with-css/
                 * full harvard reference in technical report
                 */}
                <div className="checkin-body">
                    <div id="paper">
                    
                        <div id="pattern">
                            <div id="content">
                            {title}{' '} 
                            <br/><br/>Primary Emotion: {emotion}
                            <br />Intensity: {intensity}
                            <br/><br/>{maintext}
                            <br/><br/><br /><Moment format="DD/MM/YY">{date}</Moment>
                            </div>
                        </div>
                    </div>
                    
                    
                    
                    
                </div>
               
            </div>
            
        </Fragment>
    )
}

CheckinItem.defaultProps = {
    showButtons: true,
    personalCheckins: true
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
