import { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';

// 1. Create the actual Context (The Cloud)
const AuthContext = createContext();

// 2. Create the Provider Component (The Wrapper)
export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Run the Auth Check on initial load
        axios.get('http://localhost:5000/api/homepage', { withCredentials: true })
            .then(response => {
                setCurrentUser(response.data);
                setIsLoading(false);
            })
            .catch(() => {
                setCurrentUser(null);
                setIsLoading(false);
            });
    }, []);

    // Provide the state and the loading status to the rest of the app
    return (
        <AuthContext.Provider value={{ currentUser, setCurrentUser, isLoading }}>
            {!isLoading && children} 
        </AuthContext.Provider>
    );
};

// 3. Create a Custom Hook (The easiest way to grab the data later)
export const useAuth = () => {
    return useContext(AuthContext);
};