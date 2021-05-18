import React, { useState, useEffect } from 'react'

const Alert = ({ sendedType, sendedMessage, closeAlert }) => {

    const [type, setType] = useState()
    const [message, setMessage] = useState()

    const setAlertTime = () => {
        setTimeout(() => {
            closeAlert()
        }, 3000);
    }

    useEffect(() => {
        setType(sendedType)
        setMessage(sendedMessage)
        setAlertTime()
    }, [])



    if (type == 1) {
        return (
            <div class="alert alert-danger" role="alert">
                { message }
            </div>            
        )
    }
    else if(type == 0) {
        return (
            <div class="alert alert-success" role="alert">
                { message }
            </div>            
        )
    }
    else {
        return null
    }
}

export default Alert
