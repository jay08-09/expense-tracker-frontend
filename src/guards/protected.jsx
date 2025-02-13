import React, { useEffect, useState } from 'react';
import { useNavigate, Outlet, useLocation } from 'react-router-dom';
// import { isLoggedIn } from '../services/auth';
// import Sidebar from '../components/common/sidebar';
// import Header from '../components/common/header';

const Protected = () => {
    const navigate = useNavigate()
    const location = useLocation()

    const [isAuthenticated, setIsAuthenticated] = useState(false)
    useEffect(() => {
        const checkAuthentication = async () => {
            const isAuthenticated = await isLoggedIn();
            setIsAuthenticated(true);
            if (!isAuthenticated) {
                navigate('/login', { replace: true })
            } else {
                const currentRoute = location.pathname;
                if (currentRoute === '/') {
                    navigate('/dashboard', { replace: true });
                }
            }
        };
        // Only check authentication if it hasn't been done before
        if (!isAuthenticated) {
            checkAuthentication();
        }
    }, [isAuthenticated, navigate, location])

    // Render the header and outlet only after the authentication check
    if (!isAuthenticated) {
        return null; // You can also render a loading spinner here
    }

    return <>
        <div className="flex">
            {/* <Sidebar />
            <div className="flex-1 p-">
                <Header />
                <Outlet />
            </div> */}
        </div>
    </>
}

export default Protected