import { React, useState } from 'react'
import logo from '../../picrafia.jpg'

const RegisterForm = ({ onRegister, handleChange }) => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')


  const submitRegister = (e) => {
      e.preventDefault()

      if (!email && !password) {
          alert('Please add a credential')
          return
      }
      
      onRegister({ email, password })

      setEmail('')
      setPassword('')
  }


    return (
        <main className="form-signin bg-white mt-5 mb-5">
        <form onSubmit={submitRegister}>
          <div className="pt-3 pb-3">
            <img width="90px" height="50px" src={logo}></img>
            <br></br>
            <br />
           <input onChange={(e) => setEmail(e.target.value)} value={email} type="email" id="inputEmail" className="form-control" placeholder="E-posta adresi" required autofocus />
            <br />
            <input onChange={(e) => setPassword(e.target.value)} value={password} type="password" id="inputPassword" className="form-control" placeholder="Şifre" required />
            <div className="checkbox mb-3">
            </div>
            <button className="w-100 picrafia-button" type="submit">Kayıt Ol</button>
            <div className="pt-3">
              <a href="#" onClick={handleChange} className="picrafia-font">Giriş Yap</a>
            </div>
          </div>
        </form>
      </main>
    )
}

export default RegisterForm
