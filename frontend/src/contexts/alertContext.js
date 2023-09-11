import {createContext, useState} from 'react';

export const AlertContext = createContext();

export const AlertProvider = ({children}) => {
    const [alerts, setAlerts] = useState([]);

    const addAlert = (message, type) => {
        const id = Math.random().toString(36).substr(2, 9); // Generate a unique ID
        const newAlert = {id, message, type};
        setAlerts([...alerts, newAlert]);
    };

    const removeAlert = (id) => {
        setAlerts(alerts.filter((alert) => alert.id !== id));
    };

    const alertContextData = {
        alerts,
        addAlert,
        removeAlert
    }


    return (
        <AlertContext.Provider value={alertContextData}>
            {children}
        </AlertContext.Provider>
    );
};

