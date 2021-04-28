import React, { Fragment, useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { addComment } from '../../actions/checkin'

const CheckinComment = ({ checkinId, addComment }) => {
    const [text, setText] = useState('')
    return (
        <Fragment>
            <div className="container">
                <form onSubmit={e => {
                    e.preventDefault()
                    {/*
                        TestId: T053
                     */}
                    addComment(checkinId, { text })
                    setText('')
                    }}>
                    <div className="form-group">
                        <textarea
                            className='form-control'
                            name="text"
                            value={text}
                            cols="30"
                            rows="10"
                            placeholder='Add your comment'
                            onChange={e => setText(e.target.value)}
                            required
                            >
                        </textarea>
                    </div>
                    
                    <input type="submit" className='btn btn-secondary' value='Submit'/>
                </form>
            </div>
        </Fragment>
    )
}

CheckinComment.propTypes = {
    addComment: PropTypes.func.isRequired
}

export default connect(null, { addComment })(CheckinComment)
