import React, {useState, useEffect, useContext} from 'react';
import {Helmet} from 'react-helmet';
import {TailSpin} from 'react-loader-spinner';
import {sendEmail} from "../services/contactService";
import {AuthContext} from "../contexts/authContext";

export const Contact = () => {
    const {auth} = useContext(AuthContext);
    const [successMessage, setSuccessMessage] = useState("")
    const [errorMessage, setErrorMessage] = useState("")

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    const [loading, setLoading] = useState(false);

    const onChange = e => setFormData({...formData, [e.target.name]: e.target.value});

    const onSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const result = await sendEmail(formData, auth.token);
            setSuccessMessage(result);
        } catch (error) {
            if (error.response && error.response.message) {
                setErrorMessage(error.response.data.error);
            } else {
                console.error(error);
            }
        } finally {
            setLoading(false);
            formData['name'] = "";
            formData['email'] = "";
            formData['subject'] = "";
            formData['message'] = "";
        }
    };

    return (
        <div className='contact'>
            <Helmet>
                <title>Realest Estate - Contact</title>
                <meta
                    name='description'
                    content='Contact us'
                />
            </Helmet>
            <form className='contact__form' onSubmit={e => onSubmit(e)}>
                <label className='contact__form__label' htmlFor='name'>Name*</label>
                <input
                    className='contact__form__input'
                    name='name'
                    type='text'
                    placeholder='Full Name'
                    onChange={e => onChange(e)}
                    value={formData.name}
                    required
                />
                <label className='contact__form__label' htmlFor='email'>Email*</label>
                <input
                    className='contact__form__input'
                    name='email'
                    type='email'
                    placeholder='example@gmail.com'
                    onChange={e => onChange(e)}
                    value={formData.email}
                    required
                />
                <label className='contact__form__label' htmlFor='subject'>Subject*</label>
                <input
                    className='contact__form__input'
                    name='subject'
                    type='text'
                    placeholder='Buying Home'
                    onChange={e => onChange(e)}
                    value={formData.subject}
                    required
                />
                <label className='contact__form__label' htmlFor='message'>Message</label>
                <textarea
                    className='contact__form__textarea'
                    name='message'
                    cols='30'
                    rows='10'
                    placeholder='Message'
                    onChange={e => onChange(e)}
                    value={formData.message}
                />
                {loading ?
                    <div className='contact__form__loader'>
                        <TailSpin
                            type="Oval"
                            color="#424242"
                            height={50}
                            width={50}
                        />
                    </div> :
                    <button className='contact__form__button' type='submit'>Send</button>
                }
                {errorMessage && (
                    <div className="alert-section">
                        {
                            <div className={`alert alert--error`}>
                                {errorMessage.error}
                            </div>
                        }
                    </div>
                )}
                {successMessage && (
                    <div className="alert-section">
                        {
                            <div className={`alert alert--success`}>
                                {successMessage.success}
                            </div>
                        }
                    </div>
                )}
            </form>
        </div>
    );
};
