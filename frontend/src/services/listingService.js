import axios from "axios";

const BASE_URL = "http://localhost:8000/api/listings/"

export const searchListings = async (credentials, page) => {

    try {
        const response = await axios.post(`${BASE_URL}search/?page=${page}`, credentials);
        return response.data
    } catch (error) {
        throw error
    }
};

export const getOneListing = async (listingId, token) => {
    try {
        const response = await axios.get(`${BASE_URL}${listingId}`, {
            headers: {
                "Authorization": `Token ${token}`
            }
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getAllListings = async (page) => {
    try {
        const response = await axios.get(`${BASE_URL}?page=${page}`);
        return response.data
    } catch (error) {
        throw error
    }
};