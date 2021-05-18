import axios from 'axios'
import React, { useState } from 'react'

const NewPost = () => {

    const [step, setStep] = useState(1)
    const [file, setFile] = useState(null)
    const [desc, setDesc] = useState('')
    const [tags, setTags] = useState([])
    let tempTags = [];

    const handleTag = async (tag) => {
        
        if (tags.includes(tag)) {
            const temp_tags = await [ ...tags ];
            temp_tags.splice(temp_tags.indexOf(tag), 1)
            setTags(temp_tags)
        } else {
            const temp_tags = await [ ...tags ];
            await temp_tags.push(tag)
            await setTags(temp_tags)
        }
       
    }

    const fileHandler = (e) => {
        setFile(e.target.files[0])
    }

    const handleUpload = () => {
        setDesc('')
        setFile(null)
        const formData = new FormData();
        formData.append('file', file)
        formData.append('description', desc)

        axios.post(`http://localhost:3003/api/post/new`, formData, {
            headers: { 
                'Content-Type': 'multipart/form-data'
            }
        })
    }
    
    const handleDesc = (e) => {
        setDesc(e.target.value)
    }

    const handleClick = () => {
        setStep(2)
    }

    if (step === 1) {
        return (
            <>
                <div class="container pt-5" id="newPost-main" >
                    <div class="newPost-sub">
                        <div class="alert alert-warning" role="alert">
                            Hadi Herkesi Etkile!
                        </div>
                        <div class="custom-file">
                            <input type="file" accept="image/x-png,image/gif,image/jpeg" onChange={fileHandler} class="custom-file-input" id="validatedCustomFile" required />
                            <label class="custom-file-label" for="validatedCustomFile">Fotoğraf Seç...</label>
                            <div class="invalid-feedback">Example invalid custom file feedback</div>
                        </div>
                        <div class="pt-3">
                            <label for="exampleFormControlTextarea1">Fotoğrafına bir açıklama yaz...</label>
                            <textarea value={desc} onChange={handleDesc} class="form-control" id="exampleFormControlTextarea1" rows="7"></textarea>
                        </div>
                        <div className="pt-3">
                            <label for="exampleFormControlTextarea1">Etiket Ekle</label>                                                        
                            <nav class="text-center">
                                <span onClick={() => handleTag(1)} class="p-2 link-secondary" href="#">#Portre</span>
                                <span onClick={() => handleTag(2)} class="p-2 link-secondary" href="#">#Düğün</span>
                                <span onClick={() => handleTag(3)} class="p-2 link-secondary" href="#">#Ürün</span>
                                <span onClick={() => handleTag(4)} class="p-2 link-secondary" href="#">#Drone</span>
                                <span onClick={() => handleTag(5)} class="p-2 link-secondary" href="#">#Diğer</span>
                            </nav>
                        </div>
                        <div class="newPost-sub pt-3">
                            <div class="text-right">
                                <button type="button" class="btn btn-danger">İptal</button>
                                <button onClick={handleClick} type="button" class="btn btn-warning ml-3">Devam et</button>
                            </div>
                        </div>
                    </div>
                </div>   
                <br/>         
            </>
        )        
    }
    else 
    {
        return(
            <>
                <div class="container mt-5" id="timeline-main" >
                    <div class="text-center">
                        <div id="picra-card" class="mb-3 picra-card">
                        <div class="text-left px-3 py-2">
                            <img src={file? URL.createObjectURL(file) : null} alt={file? file.name : null} class="picra-card-img" />
                            @username
                        </div>  
                        <img  width="100%" src={file? URL.createObjectURL(file) : null} alt={file? file.name : null} />
                            <div class="text-left px-1">
                                25 
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-heart" viewBox="0 0 16 16">
                                    <path d="M8 2.748l-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"/>
                                </svg>
                                
                            </div>
                            <div class="text-left px-1">
                                <b>username</b> { desc }
                            </div>
                        </div>
                        <div class="newPost-sub">
                            <div class="text-right">
                                <button onClick={() => setStep(1)} type="button" class="btn btn-danger">İptal</button>
                                <button onClick={handleUpload} type="button" class="btn btn-success ml-3">Devam et</button>
                            </div>
                        </div>
                        <br />
                    </div>  
                </div> 
            </>
            )
    }

}

export default NewPost
