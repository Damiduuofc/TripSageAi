// src/contexts/AuthContext.jsx
import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { googleLogout, useGoogleLogin } from '@react-oauth/google';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));
    const [openDialog, setOpenDialog] = useState(false);

    useEffect(() => {
        console.log('Auth State Changed:', user);
    }, [user]);

    const login = useGoogleLogin({
        onSuccess: (tokenResponse) => GetUserProfile(tokenResponse),
        onError: (error) => console.log(error),
    });

    const GetUserProfile = async (tokenInfo) => {
        try {
            const response = await axios.get(`https://www.googleapis.com/oauth2/v2/userinfo`, {
                headers: {
                    Authorization: `Bearer ${tokenInfo?.access_token}`,
                    Accept: 'application/json',
                },
            });
            console.log("User profile fetched:", response.data);
            localStorage.setItem('user', JSON.stringify(response.data));
            setUser(response.data);
            setOpenDialog(false);
        } catch (error) {
            console.error("Error fetching user profile:", error);
        }
    };

    const handleLogout = () => {
        googleLogout();
        localStorage.clear();
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, handleLogout, openDialog, setOpenDialog }}>
            {children}
        </AuthContext.Provider>
    );
};
