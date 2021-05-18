import React, { useState, useEffect } from 'react'
import ProfileSettings from '../ui/ProfileSettings'
import AccountSettings from '../ui/AccountSettings'
import axios from 'axios'

const Settings = () => {


    const [section, setSection] = useState(1)
    const [userSettings, setUserSettings] = useState([])

    useEffect(() => {
        const fetchSettings = async () => {
            const res = await axios(`http://localhost:3003/api/user/settings`)
            setUserSettings(res.data)
        }
        fetchSettings()
    }, [])

    const handleClick = () => {
        
    }

    var sectionHolder;

    if (section == 1) {
        sectionHolder = <><ProfileSettings userSettings={userSettings} /></>
    }
    else {
        sectionHolder = <><AccountSettings userSettings={userSettings} /></>
    }

    return (
        <div className="container">
            <div class="pt-3">
                <h2>Ayarlar</h2>
            </div>
            <div class="pt-3">
            <ul class="nav justify-content-center">
                <li class="nav-item">
                    <a class="nav-link active" onClick={() => setSection(1)}>Profil</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link disabled">-</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" onClick={() => setSection(3)}>Hesap</a>
                </li>
            </ul>                 
            </div>
            { sectionHolder }
            <br />               
        </div>
    )
}

export default Settings
