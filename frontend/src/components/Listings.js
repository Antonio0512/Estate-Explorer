import {useContext} from 'react';
import {Card} from './Card';
import {ListingContext} from "../contexts/listingContext";

export const Listings = () => {
    const {searchListings} = useContext(ListingContext);


    const getListings = () => {
        const listingsOnPage = [];

        for (let i = 0; i < searchListings.length; i += 3) {
            const row = (
                <div className='row' key={`row-${i}`}>
                    {searchListings.slice(i, i + 3).map((listing) => (
                        <div className='col-1-of-3' key={listing.slug}>
                            <Card listing={listing}/>
                        </div>
                    ))}
                </div>
            );
            listingsOnPage.push(row);
        }

        return listingsOnPage;
    };


    return (
        <div>
            {getListings()}
        </div>
    )
};
