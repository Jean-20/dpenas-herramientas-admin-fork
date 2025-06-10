import { createContext, useState, useContext, useEffect } from "react";
import { registerRequest, loginRequest, logoutRequest, verifyTokenRequest } from '../api/authAdmin';
import Cookies from 'js-cookie'; 

export const AuthContextAdmin = createContext();

export const useAuth = () => {
    const context = useContext(AuthContextAdmin); 
    if(!context){
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};

export const AuthProviderAdmin = ({ children }) => {

    const [admin, setAdmin] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [errors, setErrors] = useState([]);
    const [loading, setLoading] = useState(true);

    //register
    const signup = async (admin) =>{
        try {
            const res = await registerRequest(admin);
            console.log(res.data);
            setAdmin(res.data);
            setIsAuthenticated(true);
        } catch (error) {
            /* console.log(error.response)  */
            setErrors(error.response.data)
        }
    }


    //login
    const signin = async (admin) =>{
        try {
            const res = await loginRequest(admin);
            console.log(res.data);
            setAdmin(res.data);
            localStorage.setItem('user', JSON.stringify(res.data));
            setIsAuthenticated(true);
        } catch (error) {
            if(Array.isArray(error.response.data)){
                return setErrors(error.response.data)
            }
            setErrors([error.response.data.message]);
        }
    }


    //logout
    const logout = () => {
        Cookies.remove('token')
        logoutRequest();
        setIsAuthenticated(false);
        setAdmin(null);
    }

    useEffect(() => {
        if(errors.length > 0){
            const timer = setTimeout(() => {
                setErrors([])
            }, 5000)
            return () => clearTimeout(timer)
        }
    }, [errors])

    useEffect(() => {
        async function checkLogin() {
            const cookies = Cookies.get();
            if(!cookies.token){
                setIsAuthenticated(false);
                setLoading(false);
                return setAdmin(null);
            }

            try {
                const res = await verifyTokenRequest(cookies.token);
                if(!res.data){
                    setIsAuthenticated(false);
                    setLoading(false);
                    return;
                } 

                    setIsAuthenticated(true);
                    setAdmin(res.data);
                    setLoading(false);
            } catch (error) {
                setIsAuthenticated(false)
                setAdmin(null)
                setLoading(false);
                console.log(error);
            }
            
        }
        checkLogin();
        
    }, []);


    return (
        <AuthContextAdmin.Provider value={{
            signup, signin, loading, logout, admin, isAuthenticated, errors
        }}>
            { children }
        </AuthContextAdmin.Provider>

    )
}