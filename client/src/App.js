import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from 'react'
import Header from './components/ui/Header'
import Settings from './components/pages/Settings'
import Footer from './components/ui/Footer'
import Index from './components/pages/Index'
import Profile from './components/pages/Profile'
import Messages from './components/pages/Messages'
import Inbox from './components/pages/Inbox'
import Auth from './components/pages/Auth'
import Explore from './components/pages/Explore'
import NotFound from './components/pages/NotFound'
import axios from 'axios'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";
import NewPost from './components/ui/NewPost';
import Cookies from 'universal-cookie'
import Alert from './components/ui/Alert';
axios.defaults.withCredentials = true


const App = () => {

  const cookies = new Cookies()

  const [toHome, setToHome] = useState(false)
  const [me, setMe] = useState([])

  const [alertType, setAlertType] = useState()
  const [alertMessage, setAlertMessage] = useState()
  const [alertFlag, setAlertFlag] = useState(false)

  const makeAlert = async (type, message) => {
    await setAlertType(type)
    await setAlertMessage(message)
    await setAlertFlag(true)
  }

  const closeAlert = async () => {
    setAlertFlag(false)
  }

  const fetchMe = async () => {
        const res = await axios(`http://localhost:3003/api/user/me`)
        setMe(res.data)
        localStorage.setItem('picrafia-me', res.data.user_id + ':' + res.data.user_username)
  }


  useEffect(() => {
    setToHome(false)
  }, [toHome])

  const logout = () => {
    cookies.remove('picrafia-token')
    setToHome(true)
  }

  const login = async (userCredential) => {
    const res = await axios.post('http://localhost:3003/api/auth/login', userCredential, {
        
        headers: {
          'Content-type': 'application/json'
        }});
        
        if (res.data.error && res.data.error == 1) {
          makeAlert(res.data.error, res.data.message)
          return
        }

        const token = await res.data.token
        cookies.set('picrafia-token', token)
        await fetchMe()
        await setToHome(true)
  }

  const register = async (userCredential) => {
    const res = await axios.post('http://localhost:3003/api/auth/register', userCredential, {
      headers: {
        'Content-type': 'application/json'
      }});
       
        const data = await res.data.json()
        
        return data
  }


  return (
    <Router>
        <div className="App">
          <Header me={me} token={cookies.get('picrafia-token')} onlogout={logout} />
          { alertFlag && <Alert sendedType={alertType} sendedMessage={alertMessage} closeAlert={closeAlert} />  }
            <Switch>
              {toHome && <Redirect to="/" />}
              <Route path="/" exact component={() => <Index me={me} token={cookies.get('picrafia-token')}/>} />
              <Route path="/explore" component={Explore} />
              <Route path="/settings" component={Settings} />
              <Route path="/messages" component={Messages} />
              <Route path="/inbox/:inboxId" component={Inbox} />
              <Route path="/auth" component={() => <Auth  onLogin={login} onRegister={register} />} />
              <Route path="/new-post" component={NewPost} />
              <Route path="/404" component={NotFound} />
              <Route path="/:username" component={Profile} />
            </Switch>
          <Footer />
        </div>

    </Router>
  );
}

export default App;
