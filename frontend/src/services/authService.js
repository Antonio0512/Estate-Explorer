import axios from "axios";

const BASE_URL = "http://localhost:8000/api"

export const signin = async (credentials) => {
    try {
        const response = await axios.post(
            `${BASE_URL}/accounts/signin/`,
            JSON.stringify(credentials),
            {
                headers: {
                    "Content-Type": "application/json"
                }
            });
        return response.data;
    } catch (error) {
        throw error;
    }
};


export const signup = async (credentials) => {
    try {
        const response = await axios.post(
            `${BASE_URL}/accounts/signup/`,
            JSON.stringify(credentials),
            {
                headers: {
                    "Content-Type": "application/json"
                }
            });
        return response.data;
    } catch (error) {
        throw error;
    }
};