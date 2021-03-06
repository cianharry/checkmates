import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Moment from 'react-moment'
import { deleteComment } from '../../actions/checkin'

const CommentItem = ({ auth, deleteComment, checkinId, comment: { _id, text, name, avatar, user, date } }) => {
    return (
        <Fragment>
                <div className="comment-container">
                    <div className='text-center'>
                        <Link to={`/profile/${user}`}>
                        <img
                            className="round-img text-center pt-2"
                            src={avatar}
                            alt=""
                        />
                        <h4 className='primary-col'>{name}</h4>
                        </Link>
                    </div>
                    <div className='comment-body'>
                        <p className="check-font lead">
                            {text}
                        </p>
                        <p className="p-2 primary-col">
                            Posted on <Moment format="DD/MM/YY">{date}</Moment>
                        </p>
                        {/*
                            ReqId:      R0
                            TestId:     T054
                        */}
                        {!auth.loading && user === auth.user._id && (
                            <button onClick={e => deleteComment(checkinId, _id)} className="btn btn-danger">
                                <i className="fas fa-times"></i>
                            </button>
                        )}
                    </div>
                    
                </div>
                
            
        </Fragment>
    )
}

CommentItem.propTypes = {
    checkinId: PropTypes.string.isRequired,
    comment: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    deleteComment: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps, { deleteComment })(CommentItem)
