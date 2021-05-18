import { React, useState } from 'react'
import logo from '../../picrafia.jpg'

const LoginForm = ({ onLogin, handleChange }) => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const submitLogin = (e) => {
        e.preventDefault()

        if (!email && !password) {
            alert('Please add a credential')
            return
        }
        
        onLogin({ email, password })

        setEmail('')
        setPassword('')
    }

    return (
        <main className="form-signin bg-white mt-5 mb-5">
            <form onSubmit={submitLogin}>
                <div className="pt-3 pb-3">
                <img width="90px" height="50px" src={logo}></img>
            <br></br>
                    <br />
                    <input onChange={(e) => setEmail(e.target.value)} value={email} type="email" id="inputEmail" className="form-control picrafia-input" placeholder="E-posta adresi" required autofocus />
                    <br />
                    <input onChange={(e) => setPassword(e.target.value)} value={password} type="password" id="inputPassword" className="form-control picrafia-input" placeholder="Şifre" required />
                    <div className="checkbox mb-3">
                    </div>
                    <button className="w-100  picrafia-button" type="submit">Giriş</button>
                    <div className="pt-3">
                        <a href="#" className="font-weight-light picrafia-font">Şifremi unuttum</a>
                    </div>
                </div>
            </form>
            <span className="p-2 picrafia-font"><a onClick={handleChange} className="picrafia-font">Kayıt Ol</a></span>
        </main>
    )
}

export default LoginForm
