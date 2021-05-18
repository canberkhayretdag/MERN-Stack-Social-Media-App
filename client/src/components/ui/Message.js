import React from 'react'

const Message = ({ message }) => {
    console.log(message.sender)
    if (message.sender._id != localStorage.getItem('picrafia-me').split(':')[0]) {
        return (
            <div class="media w-50 ml-auto mb-3">
            <div class="media-body">
              <div class="bg-primary rounded py-2 px-3 mb-2">
                <p class="text-small mb-0 text-white">{ message.content }</p>
              </div>
              <p class="small text-muted text-right">{ message.date }</p>
            </div>
          </div>            
        )
    } else {
        return (
            <div class="media w-50 mr-auto mb-3">
            <div class="media-body">
              <div class="bg-light rounded py-2 px-3 mb-2">
                <p class="text-small mb-0 text-muted">{ message.content }</p>
              </div>
              <p class="small text-muted text-left">{ message.date }</p>
            </div>
          </div>            
        )        
    }

    return (
        <div>
            
        </div>
    )
}

export default Message
