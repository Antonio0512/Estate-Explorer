import React, {useContext} from "react";
import {AuthContext} from "../contexts/authContext"
import {Link} from "react-router-dom";

export const Navbar = () => {
    const {logout, isAuthenticated} = useContext(AuthContext);

    const authLinks = (
        <a className='navbar__top__auth__link' onClick={logout} href='#!'>Logout</a>
    );

    const guestLinks = (
        <>
            <Link className='navbar__top__auth__link' to='/signin'>Login</Link>
            <Link className='navbar__top__auth__link' to='/signup'>Sign Up</Link>
        </>
    );

    return (
        <nav className='navbar'>
            <div className='navbar__top'>
                <div className='navbar__top__logo'>
                    <Link className='navbar__top__logo__link' to='/'>Realest Estate</Link>
                </div>
                <div className='navbar__top__auth'>
                    <>
                        {isAuthenticated ? authLinks : guestLinks}
                    </>
                </div>
            </div>
            <div className='navbar__bottom'>
                <li className='navbar__bottom__item'>
                    <Link className='navbar__bottom__item__link' to='/'>Home</Link>
                </li>
                <li className='navbar__bottom__item'>
                    <Link className='navbar__bottom__item__link' to='/realtors'>Realtors</Link>
                </li>
                <li className='navbar__bottom__item'>
                    <Link className='navbar__bottom__item__link' to='/about'>About</Link>
                </li>
                <li className='navbar__bottom__item'>
                    <Link className='navbar__bottom__item__link' to='/contact'>Contact</Link>
                </li>
            </div>
        </nav>
    )
}