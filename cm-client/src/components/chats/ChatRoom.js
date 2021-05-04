import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

const ChatRoom = props => {
    return (
        <Fragment>
            <div className="container">
                <input type="text" className="form-control"/>
            </div>
        </Fragment>
    )
}

ChatRoom.propTypes = {

}

export default ChatRoom
