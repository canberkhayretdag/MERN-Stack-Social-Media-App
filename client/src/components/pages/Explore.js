import React, { useState, useEffect } from 'react'
import Header from '../ui/Header'
import Footer from '../ui/Footer'
import Gallery from '../ui/Gallery'
import PhotographerCard from '../ui/PhotographerCard'
import axios from 'axios'

const Explore = () => {

    const [posts, setPosts] = useState()
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const fetchExplore = async () => {
            const res = await axios(`http://localhost:3003/api/post/explore`)

            await setPosts(res.data)
            await setIsLoading(false)

        }

        fetchExplore()

    }, [])

    return (
        <>
            <div className="explore container">
                <div class="py-1 mb-2 text-center hash-tab">
                        <nav class="text-center">
                        <a class="p-2 link-secondary" href="#">#Portre</a>
                        <a class="p-2 link-secondary" href="#">#Düğün</a>
                        <a class="p-2 link-secondary" href="#">#Ürün</a>
                        <a class="p-2 link-secondary" href="#">#Diğer</a>
                        </nav>
                </div>
                <br />
                <Gallery posts={posts} isLoading={isLoading} />  
            </div>    
        </>
    )
}

export default Explore
