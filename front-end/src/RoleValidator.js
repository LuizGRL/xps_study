import React from 'react';
import { Navigate } from 'react-router-dom';

function RoleBasedRoute({ children, requiredRoles }) {
    const token = localStorage.getItem('token');
    const userRole = localStorage.getItem('role');

    return token && requiredRoles.includes(userRole) ? children : <Navigate to="/login" />;
}

export default RoleBasedRoute;
