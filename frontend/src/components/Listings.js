import React, {useContext} from 'react';
import {Card} from './Card';
import {ListingContext} from "../contexts/listingContext";

export const Listings = () => {
    const {listings} = useContext(ListingContext)

    const getListings = () => {
        let listingsOnPage = [];
        let result = [];

        listings.map(listing => {
            return listingsOnPage.push(
                <Card
                    key={listing.slug}
                    listing={listing}
                />
            );
        });

        for (let i = 0; i < listings.length; i += 3) {
            result.push(
                <div className='row'>
                    {listingsOnPage[i]}
                    {listingsOnPage[i + 1] ? listingsOnPage[i + 1] : null}
                    {listingsOnPage[i + 2] ? listingsOnPage[i + 2] : null}
                </div>
            );
        }

        return result;
    };

    return (
        <div>
            {getListings()}
        </div>
    );
}

