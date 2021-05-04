import React, { Fragment, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { getChats } from '../../actions/chats'
import { Spinner } from 'react-bootstrap'
import { io } from "socket.io-client";


const Chats = ({ getChats, chat: { chats, loading }, match }) => {
const [socket, setSocket] = React.useState(null)

  const socketSetup = () => {
    const token = localStorage.token
    if(token && !socket) {
      const newSocket = io('http://localhost:5000', {
        query: {
            token: localStorage.getItem('x-auth-token')
        }
    })
    // socket io connection
    // ReqId:   R0 
    // TestId:  T058
    // socket disconnection
    newSocket.on('disconnect', () => {
      setSocket(null)
      setTimeout(socketSetup, 3000)
      console.log('Socket Disconnected')
    })
    // socket connection
    newSocket.on('connect', () => {
      console.log('Socket connected')
    })

    newSocket.on('message', message => {
      console.log(message)
    })
    //
    setSocket(newSocket)
    }
  }

    const chatId = match.params.id 

    useEffect(() => {
        getChats()
        /*
        socket.emit('joinChat', {
            chatId
        })

        return () => {
            socket.emit('leaveChat', {
                chatId
            })
        }
        */
        socketSetup()
    // eslint-disable-next-line
    }, [socketSetup])
    // Displaying the existing chats
    // ReqId:   R0 
    // TestId:  T057
    return loading ? 
        <Spinner 
            animation="border"
            role="status">
        </Spinner> : (
        <Fragment> 
            <h1>Chats</h1>
            {chats.map(chat => (
                <Fragment key={chat._id}>
                    <div className="container">
                        {chat.title}
                        <Link to={`/chat/${chat._id}`} className='btn btn-secondary ml-2'>Chat</Link>
                    </div>
                </Fragment>
            ))}
        </Fragment>
    )
}

Chats.propTypes = {
    chat: PropTypes.object.isRequired,
    getChats: PropTypes.func.isRequired}

const mapStateToProps = state => ({
    chat: state.chat
})

export default connect(mapStateToProps, { getChats })(withRouter(Chats))
