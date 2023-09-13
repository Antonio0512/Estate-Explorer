import axios from "axios";

const BASE_URL = "http://localhost:8000/api/listings/"

export const searchListings = async (credentials) => {
    try {
        const response = await axios.post(`${BASE_URL}search/`, credentials);
        return response.data
    } catch (error) {
        throw error
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