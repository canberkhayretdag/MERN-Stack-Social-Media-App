import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

const PicraCard = ({ post, me }) => {

    const [liked, setLiked] = useState(false)
    const [likeCount, setLikeCount] = useState(post.likes.length)

    useEffect(() => {
        if (post.likes.includes(me.user_id)) {
            setLiked(true)
        }
    }, [])

    const handleLike = async () => {
        const res = await axios.post(`http://localhost:3003/api/post/${post.name}/like`, 
            {
                like: true
            },
            {
                headers: {
                'Authorization': `Bearer ${localStorage.getItem('picrafia-token')}`
                }                  
            })      
            
            if(res.data.success == 1){
                setLiked(true)
                setLikeCount(likeCount+1)
            }
    }

    const handleDislike = async () => {
        const res = await axios.post(`http://localhost:3003/api/post/${post.name}/dislike`, 
            {
                dislike: true
            },
            {
                headers: {
                'Authorization': `Bearer ${localStorage.getItem('picrafia-token')}`
                }                  
            }) 
            if(res.data.success == 1){
                setLiked(false)
                setLikeCount(likeCount-1)
            }
    }

    var likeButton;

    if (!liked) {
        likeButton = <>                
            <svg onClick={handleLike} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-heart" viewBox="0 0 16 16">
                <path d="M8 2.748l-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"/>
            </svg>
            </>
    } else {
        likeButton = <>               
         <svg onClick={handleDislike} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-heart-fill color-red" viewBox="0 0 16 16">
        <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"/>
       </svg></>
    }



    return (
        <div id="picra-card" class="mb-3 picra-card">
        <div class="text-left px-3 py-2">
            <img src="/img1.jpg" alt="" class="picra-card-img" />
            <Link className="pl-1 picrafia-card-font" to={ post.user.username }>{ post.user.username }</Link>
        </div>  
        <img onDoubleClick={!liked ? handleLike : handleDislike} width="100%" src={"http://localhost/media/"+post.name} />
            <div class="text-left pl-2">
                { likeCount > 0 && likeCount }{ " " }
                { likeButton }
                <div>
                    <b className="picrafia-card-font">{ post.user.username }</b><span className="pl-1 picrafia-card-font">{ post.description }</span>
                </div>
            </div>
        </div>
    )
}

export default PicraCard
