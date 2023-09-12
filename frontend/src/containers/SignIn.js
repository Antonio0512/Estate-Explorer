import React, {useContext, useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {Helmet} from 'react-helmet';
import {AuthContext} from "../contexts/authContext";

export const SignIn = () => {
    const navigate = useNavigate();

    const {signin} = useContext(AuthContext)
    const [error, setError] = useState("")
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });


    const {email, password} = formData;

    const onChange = (e) => setFormData({...formData, [e.target.name]: e.target.value});

    const onSubmit = async (e) => {
        e.preventDefault();

        try {
            await signin({email, password});
            navigate('/');
        } catch (error) {
            if (error.response && error.response.status) {
                const errorMessage = error.response.data.error;
                setError(errorMessage);
            } else {
                console.error(error);
            }
        }
    };

    return (
        <div className='auth'>
            <Helmet>
                <title>Realest Estate - Login</title>
                <meta
                    name='description'
                    content='login page'
                />
            </Helmet>
            <h1 className='auth__title'>Sign In</h1>
            <p className='auth__lead'>Sign into your Account</p>
            <form className='auth__form' method="post" onSubmit={e => onSubmit(e)}>
                <div className='auth__form__group'>
                    <input
                        className='auth__form__input'
                        type='email'
                        placeholder='Email'
                        name='email' value={email}
                        onChange={e => onChange(e)}
                        autoComplete="email"
                        required
                    />
                </div>
                <div className='auth__form__group'>
                    <input
                        className='auth__form__input'
                        type='password'
                        placeholder='Password'
                        name='password'
                        value={password}
                        onChange={e => onChange(e)}
                        autoComplete="password"
                        minLength='6'
                    />
                </div>
                <button className='auth__form__button'>Login</button>
            </form>
            {error && (
                <div className="alert-section">
                    {
                        <div className={`alert alert--error`}>
                            {error}
                        </div>
                    }
                </div>
            )}
            <p className='auth__authtext'>
                Don't have an account? <Link className='auth__authtext__link' to='/signup'>Sign Up</Link>
            </p>
        </div>
    );
};
