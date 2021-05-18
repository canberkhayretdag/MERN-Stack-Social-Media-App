import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import PicraCard from '../ui/PicraCard'

const Timeline = ({ me }) => {

    const [posts, setPosts] = useState([])

    useEffect(() => {
        const fetchPosts = async () => {
            const res = await axios(`http://localhost:3003/api/post/timeline`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('picrafia-token')}`
                }                  
            })
            setPosts(res.data)
            console.log(res.data)
        }
        fetchPosts()
    }, [])

        return (
            <>
                <div class="container" id="timeline-main" >
                    <div class="text-center">
                        <div class="alert picrafia-button-timeline div-add-post">
                            <Link className="text-white" to="/new-post">Fotoğraf Ekle</Link>
                        </div>
                        { posts.map(p => ( <PicraCard key={p._id} post={p} me={me} /> )) }
                    </div>  
                </div>              
            </>
        )
   
}

export default Timeline
