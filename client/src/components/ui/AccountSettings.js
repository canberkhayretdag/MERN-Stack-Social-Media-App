import React, { useState, useEffect } from 'react'
import axios from 'axios'

const AccountSettings = ({ userSettings }) => {

    const [email, setEmail] = useState()
    const [currentPassword, setCurrentPassword] = useState() 
    const [newPassword, setNewPassword] = useState() 
    const [newPassword2, setNewPassword2] = useState() 

    useEffect(() => {
        setEmail(userSettings.email)
    }, [])


    const handleSubmit = async (e) => {
        e.preventDefault()
        let flag = 0
        const reqData = {}
        
        if (email) { reqData.email = email }
        
        if(newPassword && newPassword == newPassword2){
            reqData.newPassword = newPassword;
            reqData.newPassword2 = newPassword2;
        }

        if (currentPassword) {
            reqData.currentPassword = currentPassword;
            
            const res = await axios.post(`http://localhost:3003/api/user/settings/account`,
                { 
                 reqData 
                } ,
                {
                 headers: { 
                    'Content-type': 'application/json'
                }
            })  
        }
        
    }

    return (
        <>
           
                <div>
                    <div className="pt-5 text-center">
                        <input class="settings-input" type="text" placeholder="E-posta" onChange={(e) => setEmail(e.target.value)} defaultValue={email}  />
                    </div>    
                    <div className="pt-4 text-center">
                        <input class="settings-input" type="text" placeholder="Yeni şifre" onChange={(e) => setNewPassword(e.target.value)} />
                    </div> 
                    <div className="pt-4 text-center">
                        <input class="settings-input" type="text" placeholder="Yeni şifre tekrar" onChange={(e) => setNewPassword2(e.target.value)} />
                    </div> 
                    <div className="pt-4 text-center">
                        <p>* Bu bilgileri güncellemek için güncel <br /> şifrenizi girmeniz gerekmektedir.</p>
                    </div> 
                    <div className="pt-4 text-center">
                        <input class="settings-input" required type="text" placeholder="Eski şifre" onChange={(e) => setCurrentPassword(e.target.value)} />
                    </div> 
                    <div class="pt-3 text-center">
                        <button className="settingsButton" onClick={handleSubmit} type="button">Kaydet</button>
                    </div>                       
                </div> 
           
        </>
    )
}

export default AccountSettings
