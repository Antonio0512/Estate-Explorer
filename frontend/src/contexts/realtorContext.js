import * as realtorService from "../services/realtorService"
import {createContext, useState} from "react";

export const RealtorContext = createContext()

export const RealtorProvider = ({children}) => {
    const [realtors, setRealtors] = useState([])
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const getOneRealtor = async (realtorId, token) => {
        try {
            return await realtorService.getRealtor(realtorId, token);
        } catch (error) {
            throw error;
        }
    };

    const getAllRealtors = async (page) => {
        try {
            const result = await realtorService.getAllRealtors(page);
            setRealtors(result.results);
            setTotalPages(Math.ceil(result.count / 3));
            return result
        } catch (error) {
            throw error;
        }
    };


    const realtorContextData = {
        getOneRealtor,
        getAllRealtors,
        realtors,
        currentPage,
        setCurrentPage,
        totalPages,
        setTotalPages
    };

    return (
        <RealtorContext.Provider value={realtorContextData}>
            {children}
        </RealtorContext.Provider>
    );
};