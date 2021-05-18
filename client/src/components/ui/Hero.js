import React from 'react'

const Hero = () => {
    return (
        <div>
            <div class="position-relative overflow-hidden text-center main-hero">
                <div class="col-md-5 p-lg-5 mx-auto my-5">
                    <h1 class="display-4 font-weight-normal text-white">Tarihi Durdur</h1>
                    <p class="lead font-weight-normal text-white">'Fotoğraf tarih olayıdır. Tarihi durduruyorsun. Bİr makine ile tarihi durduruyorsun'</p>
                    <a class="btn btn-outline-secondary" href="#">Coming soon</a>
                </div>
                <div class="product-device shadow-sm d-none d-md-block"></div>
                <div class="product-device product-device-2 shadow-sm d-none d-md-block"></div>
            </div>
        </div>
    )
}

export default Hero
