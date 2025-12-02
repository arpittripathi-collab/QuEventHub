// src/components/DashboardButton.jsx
import React from 'react';

// A simple button component for consistency and aesthetics
const DashboardButton = ({ children, onClick, icon: Icon, className = '', color = 'indigo', type = 'button' }) => (
    <button
        type={type}
        onClick={onClick}
        className={`flex items-center justify-center space-x-2 px-4 py-2 text-sm font-semibold rounded-lg transition duration-150 shadow-md 
                   bg-${color}-600 hover:bg-${color}-700 text-white focus:outline-none focus:ring-4 focus:ring-${color}-300 
                   transform hover:scale-[1.02] ${className}`}
    >
        {Icon && <Icon className="w-5 h-5" />}
        <span>{children}</span>
    </button>
);

export default DashboardButton;