import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Header from './Header'
import settingsButton from '../../gear-fill.svg'
import { Link } from "react-router-dom"

const Bio = ({ bio, messageBox, isFollowing, visitedUser, handleIsFollowing }) => {

    const handleFollow =  async () => {
        const res = await axios.post(`http://localhost:3003/api/user/${visitedUser}/follow`, 
        {
            follow: true 
        })

            if (res.data.result) {
                handleIsFollowing()
            }
        
    }

    const handleUnfollow = async () => {
        const res = await axios.post(`http://localhost:3003/api/user/${visitedUser}/unfollow`, 
            {
                unfollow: true
            })
            
            if (res.data.result) {
                handleIsFollowing()
            }
    }

    var followButton;

    if (!isFollowing) {
        followButton = <><br /><button onClick={handleFollow} type="button" class="btn btn-sm btn-warning pt-1 pb-1"><b>Takip et</b></button></>
    } else {
        followButton = <><br /><button onClick={handleUnfollow} type="button" class="btn btn-sm btn-warning pt-1 pb-1"><b>Takibi bırak</b></button></>
    }

    return (
        <>
        <div class="text-center pt-3">
            <div>
                <img id="bio-img" 
                src="https://images.unsplash.com/photo-1484186139897-d5fc6b908812?ixlib=rb-0.3.5&s=9358d797b2e1370884aa51b0ab94f706&auto=format&fit=crop&w=200&q=80%20500w" class="thumbnail" />    
            </div>
            <div class="pt-3">
                <span class="font-weight-bold font-size-20">{ bio.user_name + " "}
                { !bio.me && <Link to={"/inbox/" + messageBox }><svg className="mb-1" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-envelope" viewBox="0 0 16 16">
                    <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2zm13 2.383l-4.758 2.855L15 11.114v-5.73zm-.034 6.878L9.271 8.82 8 9.583 6.728 8.82l-5.694 3.44A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.739zM1 11.114l4.758-2.876L1 5.383v5.73z"/>
                </svg></Link>}                
                </span>

                <br /> @{ bio.user_username } { localStorage.getItem('me')}
                <br />
                { bio.user_type == 2 && <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-camera" viewBox="0 0 16 16">
                    <path d="M15 12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h1.172a3 3 0 0 0 2.12-.879l.83-.828A1 1 0 0 1 6.827 3h2.344a1 1 0 0 1 .707.293l.828.828A3 3 0 0 0 12.828 5H14a1 1 0 0 1 1 1v6zM2 4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-1.172a2 2 0 0 1-1.414-.586l-.828-.828A2 2 0 0 0 9.172 2H6.828a2 2 0 0 0-1.414.586l-.828.828A2 2 0 0 1 3.172 4H2z"/>
                    <path d="M8 11a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5zm0 1a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7zM3 6.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0z"/>
                </svg>  }
                <br />
                <span>
                { bio.user_bio }
                </span>
                <br />
                <span class="font-weight-bold">
                    21.3k followers · 2.2k following
                </span>

                    <><br />{ !bio.me && followButton }</>
                    { bio.me && <Link to="settings"><img src={settingsButton} /></Link> }
                </div>
            </div>            
        </>
    )
}

export default Bio
