import {Link} from 'react-router-dom';

export const RealtorsCard = ({realtor}) => {

    return (
        <div className='card'>
            <h3 className='card__title'>{realtor.name}</h3>
            <div className='card__header'>
                <img className='card__header__photo' src={realtor.photo} alt='House'/>
            </div>
            <p className='card__location'>{realtor.email}</p>
            <div className='row'>
                <p className='card__info'>Phone {realtor.phone}</p>
                <p className='card__info'>Description: {realtor.description}</p>
            </div>
            <Link className='card__link' to={`/realtors/${realtor.id}`}>View Realtor</Link>
        </div>
    );
};
