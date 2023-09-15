import axios from "axios";

const BASE_URL = 'http://localhost:8000/api/contacts/'


export const sendEmail = async (credentials, token) => {
    try {
        const result = await axios.post(`${BASE_URL}`, credentials,
                {
                    headers: {
                        "Authorization":
                            `Token ${token}`
                    }
                }
            )
        ;
        return result.data;
    } catch (error) {
        throw error;
    }
};