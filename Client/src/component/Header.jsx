import React from 'react'
import logo from "../component/logo.png";
const Header = () => {
    return (
        <div className='header' style={headerStyle}>

            <img height="70" width="50" src={logo} alt="logo" />

            <h1>Keep Notes</h1>
        </div>
    )
}

export default Header

const headerStyle = {
    width: '100%',
    lineHeight: '100px',
    backgroundColor: '#f5ba13',
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingLeft: '50px',
    color: 'white',
    boxShadow: '5px 3px 15px -5px rgba(0, 0, 0, 1)',
};
