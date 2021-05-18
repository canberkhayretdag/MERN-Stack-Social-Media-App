import React,{ useState, useEffect } from 'react'
import axios from 'axios'

const ProfileSettings = ({ userSettings }) => {

    const [profileImage, setProfileImage] = useState()
    const [inputName, setInputName] = useState() 
    const [inputUsername, setInputUsername] = useState() 
    const [inputBio, setInputBio] = useState() 

    useEffect(() => {
        setInputName(userSettings.name)
        setInputUsername(userSettings.username)
        setInputBio(userSettings.bio)
    }, [])

    const fileHandler = (e) => {
        setProfileImage(e.target.files[0])
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const formData = new FormData();

        let flag = 0

        if(profileImage) { formData.append('file', profileImage); flag++; }
        if(inputName){ formData.append('name', inputName); flag++; }
        if(inputUsername){ formData.append('username', inputUsername); flag++; }
        if(inputBio){ formData.append('bio', inputBio); flag++; }

        if(flag == 0){
            alert("hepsi boş")
        }
        else {
            const res = axios.post(`http://localhost:3003/api/user/settings/profile`, formData, {
                headers: { 
                    'Content-Type': 'multipart/form-data'
                }
            })



        }



    }


    return (
        <>
            <form onSubmit={handleSubmit}>
            <div className="pt-5">
                <div>
                    <div>
                        <img id="testimg123" src={profileImage? URL.createObjectURL(profileImage) : null} class="thumbnail" />    
                    </div>                    
                </div>
                <label className="btn btn-warning mt-3 upload-label" for="apply">
                    <input className="upload-input" onChange={fileHandler} type="file" name="" id="apply" accept="image" />Fotoğraf Seç
                </label>
            </div> 
            <div>
                <div className="pt-4 text-center">
                    <input class="settings-input" type="text" defaultValue={userSettings.name} onChange={(e) => setInputName(e.target.value)}
 />
                </div>    
                <div className="pt-4 text-center">
                    <input class="settings-input" type="text" defaultValue={userSettings.username} onChange={(e) => setInputUsername(e.target.value)} />
                </div> 
                <div className="pt-4 text-center">
                    <textarea class="" rows="4" cols="23" defaultValue={userSettings.bio} onChange={(e) => setInputBio(e.target.value)} />
                </div> 
                <div class="pt-3 text-center">
                    <button className="settingsButton" type="submit">Kaydet</button>
                </div>                       
            </div>
            </form>            
        </>
    )
}

export default ProfileSettings
