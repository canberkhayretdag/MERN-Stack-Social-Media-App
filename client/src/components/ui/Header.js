import { Redirect } from "react-router-dom";
import React, { useState } from 'react'
import Index from '../pages/Index'
import {
    Link
  } from "react-router-dom";

const Header = ({ token, onlogout, me }) => {
    if (token) {
        return (
            <>
                <div className="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 bg-white border-bottom shadow-sm">
                    <h5 className="my-0 mr-md-auto font-weight-normal"><Link className="picrafia-main" to="/">Picrafia</Link></h5>
                    <nav className="my-2 my-md-0 mr-md-3">
                    <span className="p-2 text-dark"><Link to="/">Anasayfa</Link></span>
                    <span className="p-2 text-dark"><Link to="/explore">Keşfet</Link></span>
                    <span className="p-2 text-dark"><Link to="/messages">Mesajlar</Link></span>
                    <span className="p-2 text-dark"><Link to={"/" + localStorage.getItem('picrafia-me').split(':')[1]}>Profil</Link></span>
                    <span className="p-2 text-dark"><a onClick={onlogout}>Çıkış</a></span>
                    </nav>
                    
                </div>
                
            </>
        )        
    } 
    else {
        return (
            <>
               
                <div className="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 bg-white border-bottom shadow-sm">
                    <h5 className="my-0 mr-md-auto font-weight-normal"><Link className="picrafia-main" to="/">Picrafia</Link></h5>
                    <nav className="my-2 my-md-0 mr-md-3">
                  
                    </nav>
                    <Link className="picrafia-button-header" to="/auth">Giriş</Link>
                </div>
                
            </>
        )        
    }

}

export default Header