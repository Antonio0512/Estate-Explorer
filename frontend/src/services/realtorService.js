import axios from "axios";

const BASE_URL = "http://localhost:8000/api/realtors/"


export const getRealtor = async (realtorId, token) => {
    try {
        const response = await axios.get(`${BASE_URL}${realtorId}/`, {
            headers: {
                'Authorization': `Token ${token}`
            }
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};