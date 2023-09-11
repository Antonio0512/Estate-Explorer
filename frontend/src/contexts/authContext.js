import {createContext} from "react";
import {useNavigate} from "react-router-dom";
import {useLocalStorage} from "../hooks/useLocalStorage";
import * as authService from "../services/authService"

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [auth, setAuth] = useLocalStorage("auth", {});
    const navigate = useNavigate();

    const signup = async (userData) => {
        try {
            await authService.signup(userData);
            navigate('/signin')
        } catch (error) {
            throw new Error(error)
        }
    };

    const signin = async (credentials) => {
        try {
            const userData = await authService.signin(credentials);
            setAuth(userData);
            navigate('/');
        } catch (error) {
            throw new Error(error)
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
        isAuthenticated: !!auth.access_token

    }

    return (
        <>
            <AuthContext.Provider value={authContextData}>
                {children}
            </AuthContext.Provider>
        </>
    );
};