import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';

const Users = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        fetchUsers();
    }, [currentPage, searchTerm]);

    const fetchUsers = async () => {
        try {
            const response = await api.getUsers({
                page: currentPage,
                search: searchTerm,
                per_page: 10
            });
            setUsers(response.data.data || response.data);
            setTotalPages(response.data.last_page || 1);
        } catch (error) {
            console.error('Failed to fetch users:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = (e) => {
        e.preventDefault();
        setCurrentPage(1);
        fetchUsers();
    };

    const handleDeleteUser = async (userId) => {
        if (!confirm('Are you sure you want to delete this user?')) return;

        try {
            await api.deleteUser(userId);
            fetchUsers(); // Refresh the list
        } catch (error) {
            console.error('Failed to delete user:', error);
            alert('Failed to delete user');
        }
    };

    if (loading) {
        return React.createElement('div', { className: 'py-12' },
            React.createElement('div', { className: 'max-w-7xl mx-auto sm:px-6 lg:px-8' },
                React.createElement('div', { className: 'flex items-center justify-center' },
                    React.createElement('div', { className: 'animate-spin rounded-full h-32 w-32 border-b-2 border-indigo-600' })
                )
            )
        );
    }

    return React.createElement('div', { className: 'py-12' },
        React.createElement('div', { className: 'max-w-7xl mx-auto sm:px-6 lg:px-8' },
            // Header
            React.createElement('div', { className: 'flex justify-between items-center mb-8' },
                React.createElement('div', null,
                    React.createElement('h1', { className: 'text-3xl font-bold text-gray-900' }, 'User Management'),
                    React.createElement('p', { className: 'text-gray-600 mt-1' }, 'Manage system users and their permissions')
                ),
                React.createElement(Link, {
                    to: '/admin/users/create',
                    className: 'bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md text-sm font-medium'
                }, 'Add New User')
            ),

            // Search
            React.createElement('div', { className: 'bg-white rounded-lg shadow mb-6' },
                React.createElement('div', { className: 'p-6' },
                    React.createElement('form', { onSubmit: handleSearch, className: 'flex gap-4' },
                        React.createElement('div', { className: 'flex-1' },
                            React.createElement('input', {
                                type: 'text',
                                placeholder: 'Search users by name or email...',
                                value: searchTerm,
                                onChange: (e) => setSearchTerm(e.target.value),
                                className: 'w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500'
                            })
                        ),
                        React.createElement('button', {
                            type: 'submit',
                            className: 'bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-md text-sm font-medium'
                        }, 'Search')
                    )
                )
            ),

            // Users Table
            React.createElement('div', { className: 'bg-white rounded-lg shadow overflow-hidden' },
                React.createElement('div', { className: 'overflow-x-auto' },
                    React.createElement('table', { className: 'min-w-full divide-y divide-gray-200' },
                        React.createElement('thead', { className: 'bg-gray-50' },
                            React.createElement('tr', null,
                                React.createElement('th', { className: 'px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider' }, 'User'),
                                React.createElement('th', { className: 'px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider' }, 'Email'),
                                React.createElement('th', { className: 'px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider' }, 'Role'),
                                React.createElement('th', { className: 'px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider' }, 'Status'),
                                React.createElement('th', { className: 'px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider' }, 'Joined'),
                                React.createElement('th', { className: 'px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider' }, 'Actions')
                            )
                        ),
                        React.createElement('tbody', { className: 'bg-white divide-y divide-gray-200' },
                            users.length > 0 ? users.map((user) =>
                                React.createElement('tr', { key: user.id },
                                    React.createElement('td', { className: 'px-6 py-4 whitespace-nowrap' },
                                        React.createElement('div', { className: 'flex items-center' },
                                            React.createElement('div', { className: 'flex-shrink-0 h-10 w-10' },
                                                React.createElement('div', { className: 'h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center' },
                                                    React.createElement('span', { className: 'text-sm font-medium text-gray-700' }, user.name.charAt(0).toUpperCase())
                                                )
                                            ),
                                            React.createElement('div', { className: 'ml-4' },
                                                React.createElement('div', { className: 'text-sm font-medium text-gray-900' }, user.name)
                                            )
                                        )
                                    ),
                                    React.createElement('td', { className: 'px-6 py-4 whitespace-nowrap' },
                                        React.createElement('div', { className: 'text-sm text-gray-900' }, user.email)
                                    ),
                                    React.createElement('td', { className: 'px-6 py-4 whitespace-nowrap' },
                                        React.createElement('span', {
                                            className: `inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                                user.role === 'admin'
                                                    ? 'bg-red-100 text-red-800'
                                                    : 'bg-blue-100 text-blue-800'
                                            }`
                                        }, user.role)
                                    ),
                                    React.createElement('td', { className: 'px-6 py-4 whitespace-nowrap' },
                                        React.createElement('span', {
                                            className: `inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                                user.email_verified_at
                                                    ? 'bg-green-100 text-green-800'
                                                    : 'bg-yellow-100 text-yellow-800'
                                            }`
                                        }, user.email_verified_at ? 'Verified' : 'Unverified')
                                    ),
                                    React.createElement('td', { className: 'px-6 py-4 whitespace-nowrap text-sm text-gray-500' },
                                        new Date(user.created_at).toLocaleDateString()
                                    ),
                                    React.createElement('td', { className: 'px-6 py-4 whitespace-nowrap text-right text-sm font-medium' },
                                        React.createElement('div', { className: 'flex justify-end space-x-2' },
                                            React.createElement(Link, {
                                                to: `/admin/users/${user.id}`,
                                                className: 'text-indigo-600 hover:text-indigo-900'
                                            }, 'View'),
                                            React.createElement('button', {
                                                onClick: () => handleDeleteUser(user.id),
                                                className: 'text-red-600 hover:text-red-900'
                                            }, 'Delete')
                                        )
                                    )
                                )
                            ) : React.createElement('tr', null,
                                React.createElement('td', { colSpan: '6', className: 'px-6 py-4 text-center text-gray-500' }, 'No users found')
                            )
                        )
                    )
                ),

                // Pagination
                totalPages > 1 && React.createElement('div', { className: 'bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6' },
                    React.createElement('div', { className: 'flex-1 flex justify-between sm:hidden' },
                        React.createElement('button', {
                            onClick: () => setCurrentPage(Math.max(1, currentPage - 1)),
                            disabled: currentPage === 1,
                            className: 'relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50'
                        }, 'Previous'),
                        React.createElement('button', {
                            onClick: () => setCurrentPage(Math.min(totalPages, currentPage + 1)),
                            disabled: currentPage === totalPages,
                            className: 'ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50'
                        }, 'Next')
                    ),
                    React.createElement('div', { className: 'hidden sm:flex-1 sm:flex sm:items-center sm:justify-between' },
                        React.createElement('div', null,
                            React.createElement('p', { className: 'text-sm text-gray-700' },
                                'Showing page ', React.createElement('span', { className: 'font-medium' }, currentPage), ' of ', React.createElement('span', { className: 'font-medium' }, totalPages)
                            )
                        ),
                        React.createElement('div', null,
                            React.createElement('nav', { className: 'relative z-0 inline-flex rounded-md shadow-sm -space-x-px' },
                                React.createElement('button', {
                                    onClick: () => setCurrentPage(Math.max(1, currentPage - 1)),
                                    disabled: currentPage === 1,
                                    className: 'relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50'
                                },
                                    React.createElement('svg', { className: 'h-5 w-5', fill: 'currentColor', viewBox: '0 0 20 20' },
                                        React.createElement('path', { fillRule: 'evenodd', d: 'M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z', clipRule: 'evenodd' })
                                    )
                                ),
                                React.createElement('button', {
                                    onClick: () => setCurrentPage(Math.min(totalPages, currentPage + 1)),
                                    disabled: currentPage === totalPages,
                                    className: 'relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50'
                                },
                                    React.createElement('svg', { className: 'h-5 w-5', fill: 'currentColor', viewBox: '0 0 20 20' },
                                        React.createElement('path', { fillRule: 'evenodd', d: 'M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z', clipRule: 'evenodd' })
                                    )
                                )
                            )
                        )
                    )
                )
            )
        )
    );
};

export default Users;
