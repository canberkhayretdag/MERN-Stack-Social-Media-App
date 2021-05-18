import React from 'react'

const Footer = () => {
    return (
    <footer id="footer">
        <div className="container py-5">
            <div className="row">
                <div className="col-12 col-md"><br />
                <span className="text-white">Picrafia ©2021</span>
                 </div>
                <div className="col-6 col-md">
                    <h5 className="picrafia-font footer-title">Company</h5>
                    <ul className="list-unstyled text-small">
                    <li><a className="picrafia-font text-muted" href="#">Cool stuff</a></li>
                    <li><a className="picrafia-font text-muted" href="#">Random feature</a></li>
                   
                    </ul> 
                </div>
                <div className="col-6 col-md">
                    <h5 className="picrafia-font footer-title">Contact</h5>
                    <ul className="list-unstyled text-small">
                    <li><a className="picrafia-font text-muted" href="#">Resource</a></li>
                    <li><a className="picrafia-font text-muted" href="#">Resource name</a></li>
                    </ul>
                </div>

            </div>
        </div>
      </footer>
    )
}

export default Footer
