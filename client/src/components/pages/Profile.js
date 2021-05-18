import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Bio from '../ui/Bio'
import Gallery from '../ui/Gallery'
import { Redirect } from 'react-router'
import NotFound from './NotFound'
import { useParams } from "react-router-dom";

const Profile = (props) => {
    //console.log(props.me.user_id)
    const { username } = useParams()
    const [bio, setBio] = useState([])
    const [posts, setPosts] = useState([])
    const [userfound, setUserfound] = useState(2)
    const [isLoading, setIsLoading] = useState(true)
    const [isFollowing, setIsFollowing] = useState(false)
    const [messageBox, setMessageBox] = useState()

    const handleIsFollowing = async () => {
        if (isFollowing) {
            setIsFollowing(false)
        } else {
            setIsFollowing(true)   
        }
    }

    useEffect(() => {
        const fetchIsFollowing = async () => {
            const res = await axios(`http://localhost:3003/api/user/${username}/following`)

            setIsFollowing(res.data.result)
        }
        fetchIsFollowing()
    }, [])

    useEffect(() => {
        const fetchPosts = async () => {
            const res = await axios (`http://localhost:3003/api/user/${username}/posts`)
            setPosts(res.data)
            setIsLoading(false)
        }
        fetchPosts()
    }, [])

    useEffect(() => {
        const getBio = async () => {
            const res = await axios(`http://localhost:3003/api/user/${username}`)

            if (res.data.user == '0') {
                setUserfound(0)
            }
            else {
                setUserfound(1)
            }

            setBio(res.data)

            if (res.data.conversation == 0) {
                var picrafia_me = await localStorage.getItem('picrafia-me')
                await setMessageBox((picrafia_me.split(':')[0]) + '-' + res.data.user_id)
            } else {
                await setMessageBox(res.data.conversation)
            }
        }
        getBio()
    }, [])
/*
    useEffect(() => {
        const fetchConversation = async () => {
            const res = await axios(`http://localhost:3003/api/user/${username}/conversation`)

            if (res.data.conversation == 0) {
                var picrafia_me = await localStorage.getItem('picrafia-me')
                var pid = await picrafia_me.split(':')[0]
                await setMessageBox(pid + bio.user_id)
            } else {
                await setMessageBox(res.data.conversation)
            }

        }
        fetchConversation()
    }, [])
*/
    switch (userfound) {
        case 1:
            return (<>
                <Bio bio={bio} messageBox={messageBox} isFollowing={isFollowing} visitedUser={username} handleIsFollowing={handleIsFollowing} />
                <Gallery posts={posts} isLoading={isLoading} />
            </>)
            
        case 0:
            return <NotFound /> 
        default:
            return null
    }
}

export default Profile
