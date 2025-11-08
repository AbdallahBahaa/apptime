import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setErrors({});

        const result = await login(formData);

        if (result.success) {
            navigate('/dashboard');
        } else {
            setErrors({ general: result.message });
        }

        setLoading(false);
    };

    return React.createElement('div', { className: 'min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8' },
        React.createElement('div', { className: 'max-w-md w-full space-y-8' },
            React.createElement('div', null,
                React.createElement('div', { className: 'w-16 h-16 bg-indigo-600 rounded-lg flex items-center justify-center mx-auto mb-4' },
                    React.createElement('svg', { className: 'w-8 h-8 text-white', fill: 'currentColor', viewBox: '0 0 20 20' },
                        React.createElement('path', { d: 'M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z' })
                    )
                ),
                React.createElement('h2', { className: 'mt-6 text-center text-3xl font-extrabold text-gray-900' }, 'Sign in to AppTime'),
                React.createElement('p', { className: 'mt-2 text-center text-sm text-gray-600' },
                    'Or ',
                    React.createElement(Link, { to: '/register', className: 'font-medium text-indigo-600 hover:text-indigo-500' }, 'create a new account')
                )
            ),

            React.createElement('form', { className: 'mt-8 space-y-6', onSubmit: handleSubmit },
                errors.general && React.createElement('div', { className: 'bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md' }, errors.general),

                React.createElement('div', { className: 'rounded-md shadow-sm -space-y-px' },
                    React.createElement('div', null,
                        React.createElement('label', { htmlFor: 'email', className: 'sr-only' }, 'Email address'),
                        React.createElement('input', {
                            id: 'email',
                            name: 'email',
                            type: 'email',
                            autoComplete: 'email',
                            required: true,
                            className: 'appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm',
                            placeholder: 'Email address',
                            value: formData.email,
                            onChange: handleChange
                        })
                    ),
                    React.createElement('div', null,
                        React.createElement('label', { htmlFor: 'password', className: 'sr-only' }, 'Password'),
                        React.createElement('input', {
                            id: 'password',
                            name: 'password',
                            type: 'password',
                            autoComplete: 'current-password',
                            required: true,
                            className: 'appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm',
                            placeholder: 'Password',
                            value: formData.password,
                            onChange: handleChange
                        })
                    )
                ),

                React.createElement('div', { className: 'flex items-center justify-between' },
                    React.createElement('div', { className: 'flex items-center' },
                        React.createElement('input', {
                            id: 'remember-me',
                            name: 'remember',
                            type: 'checkbox',
                            className: 'h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded'
                        }),
                        React.createElement('label', { htmlFor: 'remember-me', className: 'ml-2 block text-sm text-gray-900' }, 'Remember me')
                    ),

                    React.createElement('div', { className: 'text-sm' },
                        React.createElement(Link, { to: '/password/reset', className: 'font-medium text-indigo-600 hover:text-indigo-500' }, 'Forgot your password?')
                    )
                ),

                React.createElement('div', null,
                    React.createElement('button', {
                        type: 'submit',
                        disabled: loading,
                        className: 'group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed'
                    },
                        loading ? React.createElement('div', { className: 'flex items-center' },
                            React.createElement('div', { className: 'animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2' }),
                            'Signing in...'
                        ) : 'Sign in'
                    )
                )
            )
        )
    );
};

export default Login;
