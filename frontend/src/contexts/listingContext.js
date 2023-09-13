import {createContext, useState} from "react";
import * as listingsService from "../services/listingService"

export const ListingContext = createContext()

export const ListingProvider = ({children}) => {
    const [listings, setListings] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);


    const getAllListings = async (page) => {
        try {
            const result = await listingsService.getAllListings(page)
            console.log(result)
            setListings(result.results)
            setTotalPages(Math.ceil(result.count / 3));
            return result
        } catch (error) {
            throw error
        }
    };

    const searchListings = async (credentials) => {
        try {
            const result = await listingsService.searchListings(credentials);
            console.log(result)
            setListings(result)
            setTotalPages(Math.ceil(result.count / 3));
            return result
        } catch (error) {
            throw error
        }
    };

    const listingContextData = {
        getAllListings,
        searchListings,
        listings,
        currentPage,
        totalPages,
        setCurrentPage,
    };


    return (
        <ListingContext.Provider value={listingContextData}>
            {children}
        </ListingContext.Provider>
    );
};