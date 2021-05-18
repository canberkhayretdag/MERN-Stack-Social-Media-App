import axios from 'axios'
import React, { useEffect, useState, Component } from 'react'
import { Link, useParams } from "react-router-dom";
import Message from '../ui/Message'

const Inbox = () => {

    let { inboxId } = useParams()
    const [otherUser, setOtherUser] = useState()
    const [textarea, setTextarea] = useState()
    const [messages, setMessages] = useState([])
    let intervalID = 0


    const fetchInbox = async () => {
      const res = await axios(`http://localhost:3003/api/message/inbox/${inboxId}`)

      setMessages(res.data)

    }

    const fetchOtherUser = async () => {
      const res = await axios(`http://localhost:3003/api/message/inbox/${inboxId}/with`)
      console.log(res.data)
      setOtherUser(res.data.chatWith)
    }

    const handleMessageSend = async () => {
        const res = await axios.post(`http://localhost:3003/api/message/inbox/${inboxId}/new`, 
        { 
          message: textarea 
        }, 
        { 
          headers: {
          'Content-type': 'application/json'
        }
      })
      await setTextarea('')
      fetchInbox()
    }

    const handleTextarea = (e) => {
        setTextarea(e.target.value)
    }

    useEffect(() => {
      fetchOtherUser()
    }, [])

    useEffect(() => {
      fetchInbox()
      intervalID = setInterval(() => {
        fetchInbox()
      }, 12000);
      return ( ()=>{
        clearTimeout(intervalID);
     });
    }, [])

    return (
        <>
            <div className="container">        
                <div className="px-1">
                    <div class="my-3 p-3 bg-white rounded shadow-sm">
                        <h4 class="border-bottom border-gray pb-2 mb-0"><Link to={"/" + otherUser }>{ otherUser }</Link></h4>
    <div class="px-0">
      <div class="px-4 py-5 chat-box bg-white">
        {messages.map((m) => <Message message={m} />)}
      </div>

      <div class="bg-light">
        <div class="input-group">
          <input type="text" value={textarea} placeholder="Mesajınızı yazın" onChange={(e) => handleTextarea(e)} aria-describedby="button-addon2" class="form-control rounded-0 border-0 py-4 bg-light" />
          <div class="input-group-append">
            <button id="button-addon2" onClick={handleMessageSend} class="btn btn-link"> <i class="fa fa-paper-plane"></i></button>
          </div>
        </div>
      </div>

    </div>
  </div>







                    </div>                     
                </div>
        </>
    )
}

export default Inbox
