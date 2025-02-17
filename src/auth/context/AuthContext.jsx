import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(sessionStorage.getItem("access_token") || "");
    const [userId, setUserId] = useState(null);

    const getUserIdFromToken = (token) => {
        if (!token) return null;
        try {
            const payload = JSON.parse(atob(token.split(".")[1])); // Decoding the token
            console.log("token is : ", payload);
            console.log(payload.userId);
            return payload.userId;
        } catch (error) {
            console.error("Failed to decode token:", error);
            return null;
        }
    };


    useEffect(() => {
        const storedToken = sessionStorage.getItem("access_token");

        if (storedToken) {
            setToken(storedToken);
        }
    }, []);

    useEffect(() => {
        if (token) {
            sessionStorage.setItem("access_token", token);
            setUserId(getUserIdFromToken(token));
        }
        else setUserId(null);
    }, [token])

    const login = (access_token) => {
        sessionStorage.setItem("access_token", access_token);
        setToken(access_token);
    };

    const logout = () => {
        sessionStorage.removeItem("access_token");
        setToken("");
        setUserId(null);
    };

    return (
        <AuthContext.Provider value={{ token, login, logout, userId }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuthContext = () => useContext(AuthContext);