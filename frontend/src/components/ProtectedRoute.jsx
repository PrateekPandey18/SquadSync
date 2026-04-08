import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function ProtectedRoute({ children }) {
    // 1. Grab the current user and the loading state from your global cloud
    const { currentUser, isLoading } = useAuth();

    // 2. WAIT for the backend to finish checking the cookie.
    // If you don't do this, the app will instantly kick the user to /login 
    // before the backend even has a chance to say "Wait, they are logged in!"
    if (isLoading) {
        return (
            <div className="h-screen w-screen bg-[#0B0F19] flex items-center justify-center text-white">
                <span className="animate-pulse">Verifying Access...</span>
            </div>
        );
    }

    // 3. If loading is done and there is NO user, kick them to the login page
    // The "replace" prop ensures they can't use the back button to return to the protected route
    if (!currentUser) {
        return <Navigate to="/login" replace />;
    } 

    // 4. If they are logged in, let them through to the component they asked for!
    return children;
}