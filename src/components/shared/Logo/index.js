import React from 'react';
import logo from '../../../assets/logos/logo.png';
import './style.css';

const Logo = (props)=>{
    return (
        <>
            <div className={props.className ? props.className : 'logo text-center'}>
                <img className="forlogo" src={logo} alt="logo" />
            </div>
        </>
    )
}
export default Logo;