import React, { useState, useEffect } from 'react'
import img from '../../img/img1.jpg'

const Gallery = ({ posts, isLoading }) => {



    return isLoading ? (<></>) : (
            <div className="container">
                <div className="p-5">
                    <div className="row text-center">
                        <div className="column">
                            { posts.map((p,idx) => ( idx%3 == 0 ? <img src={"http://localhost/media/"+p} /> : null ))}
                        </div>
                        <div className="column">
                            { posts.map((p,idx) => ( idx%3 == 1 ? <img src={"http://localhost/media/"+p} /> : null ))}
                        </div>
                        <div className="column">
                            { posts.map((p,idx) => ( idx%3 == 2 ? <img src={"http://localhost/media/"+p} /> : null ))}
                        </div>
                    </div>
                </div>
            </div>
        )        
}


export default Gallery
