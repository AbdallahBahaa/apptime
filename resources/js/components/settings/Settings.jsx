import React, { useState, useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';
import api from '../../services/api';

const Settings = () => {
    const { user } = useAuth();
    const [settings, setSettings] = useState({
        idle_timeout: 30,
        email_notifications: true,
        theme: 'light'
    });
    const [systemSettings, setSystemSettings] = useState({
        default_idle_timeout: 10
    });
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [savingSystem, setSavingSystem] = useState(false);
    const [message, setMessage] = useState('');
    const [systemMessage, setSystemMessage] = useState('');

    useEffect(() => {
        fetchSettings();
        if (user?.isAdmin) {
            fetchSystemSettings();
        }
    }, [user]);

    const fetchSettings = async () => {
        try {
            const response = await api.getUserSettings();
            setSettings(response.data);
        } catch (error) {
            console.error('Failed to fetch settings:', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchSystemSettings = async () => {
        try {
            const response = await api.getSystemSettings();
            setSystemSettings(response.data);
        } catch (error) {
            console.error('Failed to fetch system settings:', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        setMessage('');

        try {
            await api.updateUserSettings(settings);
            setMessage('Settings saved successfully!');
            setTimeout(() => setMessage(''), 3000);
        } catch (error) {
            console.error('Failed to save settings:', error);
            setMessage('Failed to save settings. Please try again.');
        } finally {
            setSaving(false);
        }
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setSettings(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSystemChange = (e) => {
        const { name, value } = e.target;
        setSystemSettings(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSystemSubmit = async (e) => {
        e.preventDefault();
        setSavingSystem(true);
        setSystemMessage('');

        try {
            await api.updateSystemSettings(systemSettings);
            setSystemMessage('System settings saved successfully!');
            setTimeout(() => setSystemMessage(''), 3000);
        } catch (error) {
            console.error('Failed to save system settings:', error);
            setSystemMessage('Failed to save system settings. Please try again.');
        } finally {
            setSavingSystem(false);
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
        React.createElement('div', { className: 'max-w-3xl mx-auto sm:px-6 lg:px-8' },
            // Header
            React.createElement('div', { className: 'mb-8' },
                React.createElement('h1', { className: 'text-3xl font-bold text-gray-900' }, 'Settings'),
                React.createElement('p', { className: 'text-gray-600 mt-1' }, 'Manage your account preferences and system settings')
            ),

            // Success/Error Message
            message && React.createElement('div', {
                className: `mb-6 p-4 rounded-md ${message.includes('successfully') ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`
            }, message),

            // Settings Form
            React.createElement('form', { onSubmit: handleSubmit, className: 'space-y-8' },

                // Account Settings
                React.createElement('div', { className: 'bg-white rounded-lg shadow' },
                    React.createElement('div', { className: 'px-6 py-4 border-b border-gray-200' },
                        React.createElement('h3', { className: 'text-lg font-medium text-gray-900' }, 'Account Settings')
                    ),
                    React.createElement('div', { className: 'p-6 space-y-6' },
                        React.createElement('div', null,
                            React.createElement('label', { htmlFor: 'name', className: 'block text-sm font-medium text-gray-700 mb-2' }, 'Full Name'),
                            React.createElement('input', {
                                type: 'text',
                                id: 'name',
                                name: 'name',
                                value: user?.name || '',
                                disabled: true,
                                className: 'mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-50 text-gray-500'
                            }),
                            React.createElement('p', { className: 'mt-1 text-sm text-gray-500' }, 'Contact admin to change your name')
                        ),
                        React.createElement('div', null,
                            React.createElement('label', { htmlFor: 'email', className: 'block text-sm font-medium text-gray-700 mb-2' }, 'Email Address'),
                            React.createElement('input', {
                                type: 'email',
                                id: 'email',
                                name: 'email',
                                value: user?.email || '',
                                disabled: true,
                                className: 'mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-50 text-gray-500'
                            }),
                            React.createElement('p', { className: 'mt-1 text-sm text-gray-500' }, 'Contact admin to change your email')
                        )
                    )
                ),

                // Activity Settings
                React.createElement('div', { className: 'bg-white rounded-lg shadow' },
                    React.createElement('div', { className: 'px-6 py-4 border-b border-gray-200' },
                        React.createElement('h3', { className: 'text-lg font-medium text-gray-900' }, 'Activity Settings')
                    ),
                    React.createElement('div', { className: 'p-6 space-y-6' },
                        React.createElement('div', null,
                            React.createElement('label', { htmlFor: 'idle_timeout', className: 'block text-sm font-medium text-gray-700 mb-2' }, 'Idle Timeout (minutes)'),
                            React.createElement('select', {
                                id: 'idle_timeout',
                                name: 'idle_timeout',
                                value: settings.idle_timeout,
                                onChange: handleChange,
                                className: 'mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500'
                            },
                                React.createElement('option', { value: '15' }, '15 minutes'),
                                React.createElement('option', { value: '30' }, '30 minutes'),
                                React.createElement('option', { value: '60' }, '1 hour'),
                                React.createElement('option', { value: '120' }, '2 hours')
                            ),
                            React.createElement('p', { className: 'mt-1 text-sm text-gray-500' }, 'How long before you are considered idle and logged out')
                        )
                    )
                ),

                // Notification Settings
                React.createElement('div', { className: 'bg-white rounded-lg shadow' },
                    React.createElement('div', { className: 'px-6 py-4 border-b border-gray-200' },
                        React.createElement('h3', { className: 'text-lg font-medium text-gray-900' }, 'Notification Settings')
                    ),
                    React.createElement('div', { className: 'p-6 space-y-6' },
                        React.createElement('div', { className: 'flex items-center' },
                            React.createElement('input', {
                                id: 'email_notifications',
                                name: 'email_notifications',
                                type: 'checkbox',
                                checked: settings.email_notifications,
                                onChange: handleChange,
                                className: 'h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded'
                            }),
                            React.createElement('label', { htmlFor: 'email_notifications', className: 'ml-2 block text-sm text-gray-900' }, 'Email notifications'),
                            React.createElement('p', { className: 'ml-6 text-sm text-gray-500' }, 'Receive email notifications about your account activity')
                        )
                    )
                ),

                // Appearance Settings
                React.createElement('div', { className: 'bg-white rounded-lg shadow' },
                    React.createElement('div', { className: 'px-6 py-4 border-b border-gray-200' },
                        React.createElement('h3', { className: 'text-lg font-medium text-gray-900' }, 'Appearance')
                    ),
                    React.createElement('div', { className: 'p-6 space-y-6' },
                        React.createElement('div', null,
                            React.createElement('label', { htmlFor: 'theme', className: 'block text-sm font-medium text-gray-700 mb-2' }, 'Theme'),
                            React.createElement('select', {
                                id: 'theme',
                                name: 'theme',
                                value: settings.theme,
                                onChange: handleChange,
                                className: 'mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500'
                            },
                                React.createElement('option', { value: 'light' }, 'Light'),
                                React.createElement('option', { value: 'dark' }, 'Dark'),
                                React.createElement('option', { value: 'auto' }, 'Auto (System)')
                            ),
                            React.createElement('p', { className: 'mt-1 text-sm text-gray-500' }, 'Choose your preferred theme')
                        )
                    )
                ),

                // Save Button
                React.createElement('div', { className: 'flex justify-end' },
                    React.createElement('button', {
                        type: 'submit',
                        disabled: saving,
                        className: 'bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-md text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed'
                    },
                        saving ? React.createElement('div', { className: 'flex items-center' },
                            React.createElement('div', { className: 'animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2' }),
                            'Saving...'
                        ) : 'Save Settings'
                    )
                )
            ),

            // System Settings (Admin Only)
            user?.isAdmin && React.createElement('div', { className: 'space-y-8' },
                React.createElement('div', { className: 'border-t border-gray-200 pt-8' },
                    React.createElement('h2', { className: 'text-2xl font-bold text-gray-900 mb-4' }, 'System Settings'),
                    React.createElement('p', { className: 'text-gray-600 mb-6' }, 'Configure global system settings that apply to all users')
                ),

                // System Success/Error Message
                systemMessage && React.createElement('div', {
                    className: `mb-6 p-4 rounded-md ${systemMessage.includes('successfully') ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`
                }, systemMessage),

                // System Settings Form
                React.createElement('form', { onSubmit: handleSystemSubmit, className: 'space-y-8' },

                    // System Activity Settings
                    React.createElement('div', { className: 'bg-red-50 border border-red-200 rounded-lg shadow' },
                        React.createElement('div', { className: 'px-6 py-4 border-b border-red-200' },
                            React.createElement('h3', { className: 'text-lg font-medium text-red-900' }, 'System Activity Settings')
                        ),
                        React.createElement('div', { className: 'p-6 space-y-6' },
                            React.createElement('div', null,
                                React.createElement('label', { htmlFor: 'default_idle_timeout', className: 'block text-sm font-medium text-red-700 mb-2' }, 'Default Idle Timeout (seconds)'),
                                React.createElement('input', {
                                    type: 'number',
                                    id: 'default_idle_timeout',
                                    name: 'default_idle_timeout',
                                    value: systemSettings.default_idle_timeout,
                                    onChange: handleSystemChange,
                                    min: '5',
                                    max: '3600',
                                    className: 'mt-1 block w-full px-3 py-2 border border-red-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500'
                                }),
                                React.createElement('p', { className: 'mt-1 text-sm text-red-600' }, 'Default idle timeout for all users (5-3600 seconds)')
                            )
                        )
                    ),

                    // Save System Button
                    React.createElement('div', { className: 'flex justify-end' },
                        React.createElement('button', {
                            type: 'submit',
                            disabled: savingSystem,
                            className: 'bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-md text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed'
                        },
                            savingSystem ? React.createElement('div', { className: 'flex items-center' },
                                React.createElement('div', { className: 'animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2' }),
                                'Saving...'
                            ) : 'Save System Settings'
                        )
                    )
                )
            )
        )
    );
};

export default Settings;
