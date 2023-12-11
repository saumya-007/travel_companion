/* eslint-disable react-hooks/exhaustive-deps */
import axios from 'axios'
import { io } from 'socket.io-client';
import React, { useEffect, useState, useRef } from 'react'
import { toast } from 'react-toastify';
import { ConversationList } from './ConversationList'
import { Message } from './Message'

export const ChatApplication = () => {

    let [messages, setMessages] = useState()
    let [conversations, setConversations] = useState()
    let [currentChat, setCurrentChat] = useState(null)
    let [arrivalMessage, setArrivalMessage] = useState()
    let [connectedUsers, setConnectedUsers] = useState()

    let socket = useRef()
    let newMessage = useRef()
    let scrollRef = useRef()

    const onSend = async (e) => {
        e.preventDefault()
        if (!(newMessage.current.value.trim().length)) {
            toast.error("Can not send empty message !");
            return;
        }
        let sendThis = {
            conversationId: currentChat._id,
            sender: localStorage.getItem("userId"),
            text: newMessage.current.value,
        }
        const receiverId = currentChat.members.find(member => member !== localStorage.getItem("userId"))
        socket.current.emit("sendMessage", {
            senderId: localStorage.getItem("userId"),
            receiverId: receiverId,
            text: newMessage.current.value,
        })

        await axios.post(`${process.env.REACT_APP_BACKEND_SERVER}:${process.env.REACT_APP_BACKEND_SERVER_PORT}/messages`, sendThis).then(res => {
            setMessages([...messages, res.data.data]);
            newMessage.current.value = ""
        }).catch(err => {
            console.log(err);
        })

    }

    const handleEnterAsSend = async (e) => {
        if(e.key === 'Enter') {
            await onSend(e);
        }
    }

    //SOCKET IO
    useEffect(() => {
        socket.current = io(`ws://localhost:8900`);
        socket.current.on("getMessage", data => {
            setArrivalMessage({
                sender: data.senderId,
                text: data.text,
                createdAt: Date.now()
            })
        })
    }, [])
    useEffect(() => {
        socket.current.emit("addUser", localStorage.getItem("userId"))
        socket.current.on("getUsers", users => {
            let conUsr = []
            users.map(ele => {
                return conUsr.push(ele.userId)
            })
            setConnectedUsers(conUsr)
        })
    }, [localStorage.getItem("userId")])

    useEffect(async () => {
        await axios.get(`${process.env.REACT_APP_BACKEND_SERVER}:${process.env.REACT_APP_BACKEND_SERVER_PORT}/conversations/` + localStorage.getItem("userId")).then(res => {
            setConversations(res.data.data);
        }).catch(err => {
            console.log(err)
        })
    }, [])

    useEffect(() => {
        arrivalMessage && currentChat?.members.includes(arrivalMessage.sender) &&
            setMessages(prev => [...prev, arrivalMessage])
    }, [arrivalMessage, currentChat])

    useEffect(() => {
        if (currentChat) {
            axios.get(`${process.env.REACT_APP_BACKEND_SERVER}:${process.env.REACT_APP_BACKEND_SERVER_PORT}/messages/` + currentChat._id).then(res => {
                setMessages(res.data.data);
            }).catch(err => {
                console.log(err);
            })
        }
    }, [currentChat])

    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behaviour: 'smooth' })
    }, [messages])
    return (
        <>
            <div className='chat-wrapper'>
                {/* <div className='move-down'> */}
                <div className='chatBox p-2'>
                    <div className='chatBoxWrapper'>
                        {
                            currentChat ?
                                <>
                                    <div className='chatBoxTop'>
                                        {
                                            messages !== undefined ?
                                                messages.map(ele => {
                                                    return (
                                                        <div ref={scrollRef}>
                                                            <Message key={ele._id} own={ele.sender === localStorage.getItem("userId") ? true : false} message={ele} />
                                                        </div>
                                                    )
                                                }) : null
                                        }
                                    </div>
                                    <div className='chatBoxBottom p-3'>
                                        <textarea className="chatMessageInput" placeholder='Type Message' ref={newMessage} onKeyDown={handleEnterAsSend}></textarea>
                                        <button className='btn btn-primary' onClick={onSend}>Send</button>
                                    </div></> : <span className='text-center'>Open a conversation to start a chat</span>
                        }
                    </div>
                </div>
                <div className='chatMenu'>
                    <div className='chatMenuWrapper'>
                        {
                            conversations !== undefined ?
                                conversations.map(ele => {
                                    return (
                                        <div onClick={() => setCurrentChat(ele)}>
                                            <ConversationList key={ele._id} conversations={ele} connectedUsers={connectedUsers} />
                                        </div>
                                    )
                                }) : null
                        }

                    </div>
                </div>
            </div>
        </>
    )
}
