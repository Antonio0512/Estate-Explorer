import * as realtorService from "../services/realtorService"
import {createContext} from "react";

export const RealtorContext = createContext()

export const RealtorProvider = ({children}) => {
    const getOneRealtor = async (realtorId, token) => {
        try {
            return await realtorService.getRealtor(realtorId, token);
        } catch (error) {
            throw error;
        }
    };

    const realtorContextData = {
        getOneRealtor
    };

    return (
        <RealtorContext.Provider value={realtorContextData}>
            {children}
        </RealtorContext.Provider>
    );
};