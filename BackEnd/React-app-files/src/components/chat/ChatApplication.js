import axios from 'axios'
import { io } from 'socket.io-client';
import React, { useEffect, useState, useRef } from 'react'
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
        let sendThis = {
            conversationId: currentChat._id,
            sender: localStorage.getItem("userId"),
            text: newMessage.current.value,
        }
        // console.log(sendThis);
        const receiverId = currentChat.members.find(member => member !== localStorage.getItem("userId"))
        socket.current.emit("sendMessage", {
            senderId: localStorage.getItem("userId"),
            receiverId: receiverId,
            text: newMessage.current.value,
        })

        await axios.post("http://localhost:8080/messages", sendThis).then(res => {
            setMessages([...messages, res.data.data]);
            newMessage.current.value = ""
        }).catch(err => {
            console.log(err);
        })

    }

    //SOCKET IO
    useEffect(() => {
        socket.current = io('ws://localhost:8900');
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
            console.log(users)
            let conUsr = []
            users.map(ele => {
                conUsr.push(ele.userId)
            })
            setConnectedUsers(conUsr)
        })
    }, [localStorage.getItem("userId")])

    useEffect(async () => {
        await axios.get("http://localhost:8080/conversations/" + localStorage.getItem("userId")).then(res => {
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
            // console.log(currentChat._id);
            axios.get("http://localhost:8080/messages/" + currentChat._id).then(res => {
                setMessages(res.data.data);
                // console.log(res.data.data);
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
                <div className='chatBox p-2'>
                    <div className='chatBoxWrapper'>
                        {
                            currentChat ?
                                <>
                                    <div className='chatBoxTop'>
                                        {
                                            // console.log(messages)
                                            messages !== undefined ?
                                                messages.map(ele => {
                                                    return (
                                                        // console.log(ele)
                                                        <div ref={scrollRef}>
                                                            <Message key={ele._id} own={ele.sender === localStorage.getItem("userId") ? true : false} message={ele} />
                                                        </div>
                                                    )
                                                }) : null
                                        }
                                    </div>
                                    <div className='chatBoxBottom p-3'>
                                        <textarea className="chatMessageInput" placeholder='Type Message' ref={newMessage}></textarea>
                                        <button className='btn btn-primary' onClick={onSend}>Send</button>
                                    </div></> : <span className='text-center'>Open a conversation to start a chat</span>
                        }
                    </div>
                </div>
                <div className='chatMenu'>
                    <div className='chatMenuWrapper'>
                        {/* <input placeholder='Search' className='chatMenuInput'></input> */}
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
