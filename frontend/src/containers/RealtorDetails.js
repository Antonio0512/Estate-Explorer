import {useEffect, useContext, useState} from 'react';
import {Helmet} from 'react-helmet';
import {Link, useParams} from 'react-router-dom';
import {AuthContext} from '../contexts/authContext';
import {RealtorContext} from '../contexts/realtorContext';

export const RealtorDetails = () => {
    const {id} = useParams();
    const {auth} = useContext(AuthContext);
    const {getOneRealtor, getListingsByRealtor} = useContext(RealtorContext);
    const [realtor, setRealtor] = useState('');
    const [listings, setListings] = useState([]);

    useEffect(() => {
        const fetchRealtor = async () => {
            try {
                const currRealtor = await getOneRealtor(id, auth.token);
                setRealtor(currRealtor);
                const realtorListings = await getListingsByRealtor(currRealtor.id, auth.token);
                setListings(realtorListings);
            } catch (error) {
                console.error(error);
            }
        };
        fetchRealtor();
    }, [id]);

    return (
        <div className='listingdetail'>
            <Helmet>
                <title>Realest Estate - Realtor | {`${realtor.name}`}</title>
                <meta name='description' content='Realtor detail'/>
            </Helmet>
            <div className='listingdetail__header'>
                <h1 className='listingdetail__title'>{realtor.name}</h1>
            </div>
            <div className='row'>
                <div className='listingdetail__breadcrumb'>
                    <Link className='listingdetail__breadcrumb__link' to='/'>
                        Home
                    </Link>{' '}
                    / {realtor.name}
                </div>
            </div>
            <div className='row'>
                <div className='col-3-of-4'>
                    <div className='listingdetail__display'>
                        <img className='listingdetail__display__image__main' src={realtor.photo} alt='realtor photo'/>
                    </div>
                </div>
                <div className='col-1-of-4'>
                    <div className='listings'>
                        <h1>Listings:</h1>
                        {listings.slice(0, 3).map((listing) => (
                            <div key={listing.slug}>
                                <Link to={`/listings/${listing.slug}`}>
                                    <div className='listingdetail__display'>
                                        <img
                                            className='listingdetail__display__image'
                                            src={listing.photo_main}
                                            alt={listing.title}
                                        />
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className='row'>
                <div className='col-1-of-2'>
                    <ul className='listingdetail__list'>
                        <li className='listingdetail__list__item'>Name: {realtor.name}</li>
                        <li className='listingdetail__list__item'>Email: {realtor.email}</li>
                        <li className='listingdetail__list__item'>Phone: {realtor.phone}</li>
                    </ul>
                </div>
                <div className='col-1-of-2'>
                    <ul className='listingdetail__list'>
                        <li className='listingdetail__list__item'>Listings: {listings.length}</li>
                        <li className='listingdetail__list__item'>Top Seller: {realtor.top_seller ? "Yes" : "No"}</li>
                    </ul>
                </div>
            </div>
            <div className='row'>
                <p className='listingdetail__description'>{realtor.description}</p>
            </div>
        </div>
    );
};
