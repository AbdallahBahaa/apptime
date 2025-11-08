import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

function Layout({ children }) {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async (e) => {
        e.preventDefault();
        await logout();
        navigate('/');
    };

    return React.createElement('div', { className: 'min-h-screen bg-gray-50' },
        React.createElement('nav', { className: 'bg-white shadow-sm border-b border-gray-200' },
            React.createElement('div', { className: 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8' },
                React.createElement('div', { className: 'flex justify-between h-16' },
                    React.createElement('div', { className: 'flex' },
                        React.createElement('div', { className: 'shrink-0 flex items-center' },
                            React.createElement('a', { href: '/', className: 'flex items-center' },
                                React.createElement('div', { className: 'w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center mr-3' },
                                    React.createElement('svg', { className: 'w-5 h-5 text-white', fill: 'currentColor', viewBox: '0 0 20 20' },
                                        React.createElement('path', { d: 'M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z' })
                                    )
                                ),
                                React.createElement('span', { className: 'text-xl font-bold text-gray-900' }, 'AppTime')
                            )
                        )
                    ),
                    React.createElement('div', { className: 'flex items-center' },
                        React.createElement('div', { className: 'flex items-center space-x-4' },
                            React.createElement('a', { href: '/dashboard', className: 'text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium transition duration-200' }, 'Dashboard'),
                            user && user.role === 'admin' && React.createElement(React.Fragment, null,
                                React.createElement('a', { href: '/admin/dashboard', className: 'bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-md text-sm font-medium transition duration-200' }, 'Admin Panel'),
                                React.createElement('a', { href: '/settings', className: 'text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium transition duration-200' }, 'Settings')
                            ),
                            React.createElement('span', { className: 'text-sm text-gray-700' }, user ? user.name : ''),
                            React.createElement('form', { onSubmit: handleLogout, className: 'inline' },
                                React.createElement('button', { type: 'submit', className: 'text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium transition duration-200' }, 'Logout')
                            )
                        )
                    )
                )
            )
        ),
        React.createElement('main', null, children)
    );
}

export default Layout;
