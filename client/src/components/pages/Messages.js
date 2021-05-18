import React, { useState, useEffect  } from 'react'
import axios from 'axios'
import { Link } from "react-router-dom";

const Messages = () => {

    const [messageBoxes, setMessageBoxes] = useState([])
    const [clickedInbox, setClickedInbox] = useState()

    useEffect(() => {
        const fetchMessageBoxes = async () => {
            const res = await axios(`http://localhost:3003/api/message/inbox`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('picrafia-token')}`
                }                  
            })

            await setMessageBoxes([ res.data ][0])
        }
        fetchMessageBoxes()
    }, [])

    return (
        <>
            <div className="container">        
                <div className="px-5">
                <div class="my-3 p-3 bg-white rounded shadow-sm">
    <h4 class="border-bottom border-gray pb-2 mb-0">Mesajlar</h4>

    { messageBoxes.map((m) => 
    <Link to={ "/inbox/" + m.combinedName }><div class="media text-muted pt-3 text-left">
      <p class="media-body pb-3 mb-0 lh-125 border-bottom border-gray">
        <b>{ m.lastMessage.sender.username }</b>: { m.lastMessage.content }
      </p>
    </div></Link>
    ) /* ss*/}


  </div>                     
                </div>
            </div>
        </>
    )
}

export default Messages
