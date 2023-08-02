import React from 'react'
import logo from "../component/logo.png";
const Header = () => {
    return (
        <div className='header'>
            <img height="70" width="50" src={logo} alt="logo" />

            <h1>Keep Notes</h1>
        </div>
    )
}

export default Header