import {createContext, useState} from "react";
import * as listingsService from "../services/listingService"

export const ListingContext = createContext()

export const ListingProvider = ({children}) => {
    const [listings, setListings] = useState([]);

    const getListings = async (credentials) => {
        try {
            const result = await listingsService.getAllListings(credentials)
            setListings(result)
        } catch (error) {
            throw error
        }
    };

    const listingContexData = {
        listings,
        getListings
    };

    return (
        <ListingContext.Provider value={listingContexData}>
            {children}
        </ListingContext.Provider>
    );
};