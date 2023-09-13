import {Link} from 'react-router-dom';

export const Card = ({listing}) => {
    const numberWithCommas = (x) => {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    };

    return (
        <div className='col-1-of-3'>
            <div className='card'>
                <h3 className='card__title'>{listing.title}</h3>
                <div className='card__header'>
                    <img className='card__header__photo' src={listing.photo_main} alt='House'/>
                </div>
                <p className='card__location'>{listing.address}, {listing.city}, {listing.state}</p>
                <div className='row'>
                    <div className='col-2-of-3'>
                        <p className='card__info'>Price: ${numberWithCommas(listing.price)}</p>
                        <p className='card__info'>Bedrooms: {listing.bedrooms}</p>
                        <p className='card__info'>Bathrooms: {listing.bathrooms}</p>
                    </div>
                    <div className='col-1-of-3'>
                        <p className='card__saletype'>{listing.sale_type}</p>
                        <p className='card__hometype'>{listing.home_type}</p>
                        <p className='card__sqft'>Sqft: {listing.sqft}</p>
                    </div>
                </div>
                <Link className='card__link' to={`/listings/${listing.slug}`}>View Listing</Link>
            </div>
        </div>
    );
};
