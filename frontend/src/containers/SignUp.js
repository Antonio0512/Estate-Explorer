import React, {useContext, useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {Helmet} from 'react-helmet';
import {AuthContext} from "../contexts/authContext";

export const SignUp = () => {
    const navigate = useNavigate();

    const {signup, isAuthenticated} = useContext(AuthContext);
    const [error, setError] = useState("")

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password2: ''
    });

    const {name, email, password, password2} = formData;

    const onChange = (e) => setFormData({...formData, [e.target.name]: e.target.value});

    const onSubmit = async (e) => {
        e.preventDefault();

        try {
            await signup({name, email, password, password2});
            navigate('/');
        } catch (error) {
            if (error.response && error.response.status) {
                setError(error.response.data.error);
            } else {
                console.error(error)
            }
        }
    };


    return (
        <div className='auth'>
            <Helmet>
                <title>Realest Estate - Sign Up</title>
                <meta
                    name='description'
                    content='sign up page'
                />
            </Helmet>

            <h1 className='auth__title'>Sign Up</h1>
            <p className='auth__lead'>Create your Account</p>
            <form className='auth__form' method="post" onSubmit={e => onSubmit(e)}>
                <div className='auth__form__group'>
                    <input
                        className='auth__form__input'
                        type='text'
                        placeholder='Name'
                        name='name'
                        value={name}
                        onChange={e => onChange(e)}
                        required
                        autoComplete="name"
                    />
                </div>
                <div className='auth__form__group'>
                    <input
                        className='auth__form__input'
                        type='email'
                        placeholder='Email'
                        name='email'
                        value={email}
                        onChange={e => onChange(e)}
                        required
                        autoComplete="email"
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
                        autoComplete="new-password"
                    />
                </div>
                <div className='auth__form__group'>
                    <input
                        className='auth__form__input'
                        type='password'
                        placeholder='Confirm Password'
                        name='password2'
                        value={password2}
                        onChange={e => onChange(e)}
                        autoComplete="new-password"
                    />
                </div>

                <button className='auth__form__button'>Register</button>
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
                Already have an account? <Link className='auth__authtext__link' to='/login'>Sign In</Link>
            </p>
        </div>
    );
};
