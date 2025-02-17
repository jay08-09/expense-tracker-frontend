import React, { useEffect, useState } from 'react';
import { useNavigate, Outlet, useLocation } from 'react-router-dom'

const Protected = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const [isAuthenticated, setIsAuthenticated] = useState(null);

    const checkAuthentication = () => {
        const token = localStorage.getItem("authToken");
        setIsAuthenticated(!!token);
        if (!token) {
            navigate('/login', { replace: true });
        } else if (location.pathname === '/') {
            navigate('/dashboard', { replace: true });
        }
    };

    useEffect(() => {
        checkAuthentication()
    }, [navigate, location])

    if (isAuthenticated === null) {
        return <div>Loading...</div>; // Show a loading spinner if needed
    }

    return (
        <div>
            <Outlet />
        </div>
    )

}

export default Protected;