import axios from "axios";

const BASE_URL = "http://localhost:8000/api/listings/"

export const getAllListings = async (credentials) => {
    try {
        const response = await axios.post(`${BASE_URL}search/`, credentials);
        return response.data
    } catch (error) {
        throw error
    }
};