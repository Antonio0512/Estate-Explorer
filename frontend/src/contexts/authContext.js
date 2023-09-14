import {createContext} from "react";
import {useNavigate} from "react-router-dom";
import * as authService from "../services/authService"
import {useLocalStorage} from "../hooks/useLocalStorage";

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [auth, setAuth] = useLocalStorage("auth", {});
    const navigate = useNavigate();

    const signup = async (credentials) => {
        try {
            const userData = await authService.signup(credentials);
            setAuth(userData);
        } catch (error) {
            throw error
        }
    };

    const signin = async (credentials) => {
        try {
            const userData = await authService.signin(credentials);
            setAuth(userData);
        } catch (error) {
            throw error
        }
    };

    const logout = () => {
        setAuth({})
        navigate('/')
    }

    const authContextData = {
        signup,
        signin,
        logout,
        isAuthenticated: auth?.token,
        auth
    };

    return (
        <>
            <AuthContext.Provider value={authContextData}>
                {children}
            </AuthContext.Provider>
        </>
    );
};