import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../../services/api';

const UserDetail = () => {
    const { id } = useParams();
    const [user, setUser] = useState(null);
    const [activities, setActivities] = useState([]);
    const [penalties, setPenalties] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('profile');

    useEffect(() => {
        fetchUserData();
    }, [id]);

    const fetchUserData = async () => {
        try {
            const [userResponse, activitiesResponse, penaltiesResponse] = await Promise.all([
                api.getUser(id),
                api.getUserActivities(id),
                api.getUserPenalties(id)
            ]);

            setUser(userResponse.data);
            setActivities(activitiesResponse.data);
            setPenalties(penaltiesResponse.data);
        } catch (error) {
            console.error('Failed to fetch user data:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleRoleChange = async (newRole) => {
        try {
            await api.updateUserRole(id, newRole);
            setUser(prev => ({ ...prev, role: newRole }));
        } catch (error) {
            console.error('Failed to update user role:', error);
            alert('Failed to update user role');
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

    if (!user) {
        return React.createElement('div', { className: 'py-12' },
            React.createElement('div', { className: 'max-w-7xl mx-auto sm:px-6 lg:px-8' },
                React.createElement('div', { className: 'text-center' },
                    React.createElement('h1', { className: 'text-2xl font-bold text-gray-900 mb-4' }, 'User Not Found'),
                    React.createElement(Link, { to: '/admin/users', className: 'text-indigo-600 hover:text-indigo-500' }, 'Back to Users')
                )
            )
        );
    }

    return React.createElement('div', { className: 'py-12' },
        React.createElement('div', { className: 'max-w-7xl mx-auto sm:px-6 lg:px-8' },
            // Header
            React.createElement('div', { className: 'flex justify-between items-center mb-8' },
                React.createElement('div', null,
                    React.createElement('h1', { className: 'text-3xl font-bold text-gray-900' }, user.name),
                    React.createElement('p', { className: 'text-gray-600 mt-1' }, user.email)
                ),
                React.createElement(Link, { to: '/admin/users', className: 'bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-md text-sm font-medium' }, 'Back to Users')
            ),

            // Tabs
            React.createElement('div', { className: 'mb-8' },
                React.createElement('div', { className: 'border-b border-gray-200' },
                    React.createElement('nav', { className: '-mb-px flex space-x-8' },
                        ['profile', 'activities', 'penalties'].map((tab) =>
                            React.createElement('button', {
                                key: tab,
                                onClick: () => setActiveTab(tab),
                                className: `py-2 px-1 border-b-2 font-medium text-sm ${
                                    activeTab === tab
                                        ? 'border-indigo-500 text-indigo-600'
                                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                }`
                            }, tab.charAt(0).toUpperCase() + tab.slice(1))
                        )
                    )
                )
            ),

            // Tab Content
            activeTab === 'profile' && React.createElement('div', { className: 'bg-white rounded-lg shadow p-6' },
                React.createElement('h3', { className: 'text-lg font-medium text-gray-900 mb-6' }, 'User Profile'),
                React.createElement('div', { className: 'grid grid-cols-1 md:grid-cols-2 gap-6' },
                    React.createElement('div', null,
                        React.createElement('label', { className: 'block text-sm font-medium text-gray-700 mb-2' }, 'Name'),
                        React.createElement('p', { className: 'text-gray-900' }, user.name)
                    ),
                    React.createElement('div', null,
                        React.createElement('label', { className: 'block text-sm font-medium text-gray-700 mb-2' }, 'Email'),
                        React.createElement('p', { className: 'text-gray-900' }, user.email)
                    ),
                    React.createElement('div', null,
                        React.createElement('label', { className: 'block text-sm font-medium text-gray-700 mb-2' }, 'Role'),
                        React.createElement('select', {
                            value: user.role,
                            onChange: (e) => handleRoleChange(e.target.value),
                            className: 'mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500'
                        },
                            React.createElement('option', { value: 'user' }, 'User'),
                            React.createElement('option', { value: 'admin' }, 'Admin')
                        )
                    ),
                    React.createElement('div', null,
                        React.createElement('label', { className: 'block text-sm font-medium text-gray-700 mb-2' }, 'Status'),
                        React.createElement('span', {
                            className: `inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                user.email_verified_at ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                            }`
                        }, user.email_verified_at ? 'Verified' : 'Unverified')
                    ),
                    React.createElement('div', null,
                        React.createElement('label', { className: 'block text-sm font-medium text-gray-700 mb-2' }, 'Joined'),
                        React.createElement('p', { className: 'text-gray-900' }, new Date(user.created_at).toLocaleDateString())
                    ),
                    React.createElement('div', null,
                        React.createElement('label', { className: 'block text-sm font-medium text-gray-700 mb-2' }, 'Last Updated'),
                        React.createElement('p', { className: 'text-gray-900' }, new Date(user.updated_at).toLocaleDateString())
                    )
                )
            ),

            activeTab === 'activities' && React.createElement('div', { className: 'bg-white rounded-lg shadow overflow-hidden' },
                React.createElement('div', { className: 'px-6 py-4 border-b border-gray-200' },
                    React.createElement('h3', { className: 'text-lg font-medium text-gray-900' }, 'User Activities')
                ),
                React.createElement('div', { className: 'p-6' },
                    activities.length > 0 ? React.createElement('div', { className: 'space-y-4' },
                        activities.map((activity, index) =>
                            React.createElement('div', { key: index, className: 'flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0' },
                                React.createElement('div', null,
                                    React.createElement('p', { className: 'text-sm font-medium text-gray-900' }, activity.action),
                                    React.createElement('p', { className: 'text-sm text-gray-500' }, activity.details || 'No additional details')
                                ),
                                React.createElement('div', { className: 'text-sm text-gray-500' },
                                    new Date(activity.created_at).toLocaleString()
                                )
                            )
                        )
                    ) : React.createElement('p', { className: 'text-gray-500 text-center py-4' }, 'No activities found')
                )
            ),

            activeTab === 'penalties' && React.createElement('div', { className: 'bg-white rounded-lg shadow overflow-hidden' },
                React.createElement('div', { className: 'px-6 py-4 border-b border-gray-200' },
                    React.createElement('h3', { className: 'text-lg font-medium text-gray-900' }, 'User Penalties')
                ),
                React.createElement('div', { className: 'p-6' },
                    penalties.length > 0 ? React.createElement('div', { className: 'space-y-4' },
                        penalties.map((penalty, index) =>
                            React.createElement('div', { key: index, className: 'flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0' },
                                React.createElement('div', null,
                                    React.createElement('p', { className: 'text-sm font-medium text-gray-900' }, penalty.reason),
                                    React.createElement('p', { className: 'text-sm text-gray-500' }, `Penalty points: ${penalty.points}`)
                                ),
                                React.createElement('div', { className: 'text-sm text-gray-500' },
                                    new Date(penalty.created_at).toLocaleString()
                                )
                            )
                        )
                    ) : React.createElement('p', { className: 'text-gray-500 text-center py-4' }, 'No penalties found')
                )
            )
        )
    );
};

export default UserDetail;
