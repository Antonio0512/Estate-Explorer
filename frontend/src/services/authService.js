import axios from "axios";

const BASE_URL = "http://localhost:8000/api"

export const signin = async (credentials) => {
    try {
        const response = await axios.post(`${BASE_URL}/token/`, credentials);
        return response.data;
    } catch (error) {
        throw error;
    }
};


export const signup = async (userData) => {
    try {
        const response = await axios.post(`${BASE_URL}/accounts/signup/`, userData)
        return response.data;
    } catch (error) {
        throw error
    }
};