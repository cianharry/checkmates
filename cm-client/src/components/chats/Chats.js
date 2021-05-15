import React, { Fragment, useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { io } from "socket.io-client";
import './Chats.css'

let CONNECTION_PORT
if(process.env.NODE_ENV === 'production') {
    CONNECTION_PORT = window.location.hostname
}
else {
    CONNECTION_PORT = 'http://localhost:5000'
}

// GENERAL DOCUMENTATION: https://www.npmjs.com/package/socket.io 
// GENERAL DOCUMENTATION: https://socket.io/docs/v3/client-initialization/

/***************************************************************************************
*    Title: Socket-Chat-App
*    Author: Pedro Machado
*    Date: 2020
*    Code version: 1.0
*    Availability: https://github.com/machadop1407/Socket-Chat-App
*
***************************************************************************************/

let socket

const Chats = ({ auth: {user} }) => {
    
    const [room, setRoom] = useState('')
    const [userName, setUserName] = useState('')
    const [inRoom, setInRoom] = useState(false)

    const [message, setMessage] = useState('')
    const [messageList, setMessageList] = useState([])

    useEffect(() => {
        socket = io(CONNECTION_PORT)
        
    }, [CONNECTION_PORT])

    useEffect(() => {
        socket.on('receiveMessage', (data) => {
            console.log(data)
            setMessageList([...messageList, data])
        })
    })

    const connectToRoom = () => {
        socket.emit('joinRoom', ({ userName, room }))
        setInRoom(true)
    }

    const leaveRoom = () => {
        socket.emit('leaveRoom', ({ userName, room }))
        setInRoom(false)
        setMessageList([])
    }

    const sendMessage = async () => {

        let chatMessage = {
            room: room,
            content: {
                userName: userName,
                message: message
            }
        }

        await socket.emit('sendMessage', chatMessage )
        setMessageList([...messageList, chatMessage.content])
        setMessage('')
    }

    return (
        <Fragment> 
            
            {inRoom ? 
                <div className="chat-container">
                    <h1 className='check-font'>{room}</h1>
                    <div className="chat-message-container">
                        {messageList.map((val, key) => {
                            return (
                                <div className="messages-container" id={val.userName === userName ? 'me' : 'other'}>
                                    <div className="messages" >
                                        <p className="primary"><strong>{val.userName}</strong></p>
                                        <p className="lead">{val.message} </p>
                                    </div>
                                </div>
                                
                            )
                        })}
                    </div>
                    <div className='chat-input'>
                        <input
                            className=""
                            name='message'
                            value={message}
                            type="text"
                            placeholder='Enter Message'
                            onChange={(e) => {
                                setMessage(e.target.value)
                                setUserName(user.name)
                            }}
                        />
                        <button
                            className='btn btn-secondary'
                            onClick={sendMessage}>
                                Send
                        </button>
                    </div>
                    <button
                        className='btn btn-danger'
                        onClick={leaveRoom}
                        >
                        Leave
                    </button>
                </div> 
                : 
                <div className="chat-form-container">
                    <h1 className='check-font large'>check-mate chats</h1>
                    <div className="form-group">
                        <select
                        onChange={(e) => {
                            setRoom(e.target.value)
                            setUserName(user.name)
                        }}
                        className='form-control'
                        required
                        name="room"
                        value={room} >
                            <option value="0">* Select Chat Room</option>
                            <option value="Anxiety">Anxiety</option>
                            <option value="Bipolar Disorders">Bipolar Disorders</option>
                            <option value="Depression">Depression</option>
                            <option value="Eating Disorders">Eating Disorders</option>
                            <option value="Paranoia">Paranoia</option>
                            <option value="Postnatal Depression">Postnatal Depression</option>
                            <option value="PTSD">Post Traumtic Stress Disorder (PTSD)</option>
                            <option value="Schizophrenia">Schizophrenia</option>
                            <option value="Self Harm">Self Harm</option>
                            <option value="Substance Abuse">Substance Abuse</option>
                            <option value="Suicide">Suicide</option>
                        </select>
                        
                    </div>
                    <button
                        className='btn btn-secondary'
                        onClick={connectToRoom}>
                            Join
                    </button>
                </div> 
            }
        </Fragment>
    )
}

Chats.propTypes = {
    auth: PropTypes.object.isRequired,
}
const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps, {  })(Chats)
