import React from 'react'
import Hero from '../ui/Hero'
import Timeline from '../ui/Timeline'

const Index = ({ token, me }) => {

    if (token) {
        return (<Timeline me={me} />)
    }
    else {
        return (<Hero />)
    }
}

export default Index
