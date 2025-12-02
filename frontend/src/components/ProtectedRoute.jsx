// src/components/ProtectedRoute.jsx
import React from 'react';
// In a real application, this would use React Router and check authentication status

const ProtectedRoute = ({ children, isAuthenticated, redirectTo = '/login' }) => {
    if (!isAuthenticated) {
        // In a real app, this would use navigate(redirectTo) from React Router
        return (
            <div className="p-8 text-center text-red-500">
                Please <a href={redirectTo} className="text-indigo-600 underline">log in</a> to view this page.
            </div>
        );
    }
    return children;
};

export default ProtectedRoute;