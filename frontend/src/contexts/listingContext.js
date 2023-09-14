import {createContext, useState} from "react";
import * as listingsService from "../services/listingService"

export const ListingContext = createContext()

export const ListingProvider = ({children}) => {
    const [searchListings, setSearchListings] = useState([]);
    const [searchCurrentPage, setSearchCurrentPage] = useState(1);
    const [searchTotalPages, setSearchTotalPages] = useState(1);

    const [listings, setListings] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);


    const getAllListings = async (page) => {
        try {
            const result = await listingsService.getAllListings(page)
            setListings(result.results)
            setTotalPages(Math.ceil(result.count / 3));
            return result
        } catch (error) {
            throw error
        }
    };

    const getOneListing = async (listingId, token) => {
        try {
            return await listingsService.getOneListing(listingId, token)
        } catch (error) {
            throw error
        }
    };

    const getSearchListings = async (credentials, page) => {
        try {
            const result = await listingsService.searchListings(credentials, page);
            setSearchListings(result.results)
            setSearchTotalPages(Math.ceil(result.count / 3));
            return result
        } catch (error) {
            throw error
        }
    };

    const listingContextData = {
        getAllListings,
        getSearchListings,
        getOneListing,
        searchListings,
        listings,
        searchCurrentPage,
        searchTotalPages,
        setSearchCurrentPage,
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