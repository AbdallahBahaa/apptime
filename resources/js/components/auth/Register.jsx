import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password_confirmation: ''
    });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const { register } = useAuth();
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

        // Basic validation
        const newErrors = {};
        if (formData.password !== formData.password_confirmation) {
            newErrors.password_confirmation = 'Passwords do not match';
        }
        if (formData.password.length < 8) {
            newErrors.password = 'Password must be at least 8 characters';
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            setLoading(false);
            return;
        }

        const result = await register(formData);

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
                React.createElement('h2', { className: 'mt-6 text-center text-3xl font-extrabold text-gray-900' }, 'Create your account'),
                React.createElement('p', { className: 'mt-2 text-center text-sm text-gray-600' },
                    'Or ',
                    React.createElement(Link, { to: '/login', className: 'font-medium text-indigo-600 hover:text-indigo-500' }, 'sign in to existing account')
                )
            ),

            React.createElement('form', { className: 'mt-8 space-y-6', onSubmit: handleSubmit },
                errors.general && React.createElement('div', { className: 'bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md' }, errors.general),

                React.createElement('div', { className: 'rounded-md shadow-sm -space-y-px' },
                    React.createElement('div', null,
                        React.createElement('label', { htmlFor: 'name', className: 'sr-only' }, 'Full Name'),
                        React.createElement('input', {
                            id: 'name',
                            name: 'name',
                            type: 'text',
                            autoComplete: 'name',
                            required: true,
                            className: 'appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm',
                            placeholder: 'Full Name',
                            value: formData.name,
                            onChange: handleChange
                        }),
                        errors.name && React.createElement('p', { className: 'mt-1 text-sm text-red-600' }, errors.name)
                    ),
                    React.createElement('div', null,
                        React.createElement('label', { htmlFor: 'email', className: 'sr-only' }, 'Email address'),
                        React.createElement('input', {
                            id: 'email',
                            name: 'email',
                            type: 'email',
                            autoComplete: 'email',
                            required: true,
                            className: 'appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm',
                            placeholder: 'Email address',
                            value: formData.email,
                            onChange: handleChange
                        }),
                        errors.email && React.createElement('p', { className: 'mt-1 text-sm text-red-600' }, errors.email)
                    ),
                    React.createElement('div', null,
                        React.createElement('label', { htmlFor: 'password', className: 'sr-only' }, 'Password'),
                        React.createElement('input', {
                            id: 'password',
                            name: 'password',
                            type: 'password',
                            autoComplete: 'new-password',
                            required: true,
                            className: 'appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm',
                            placeholder: 'Password (min. 8 characters)',
                            value: formData.password,
                            onChange: handleChange
                        }),
                        errors.password && React.createElement('p', { className: 'mt-1 text-sm text-red-600' }, errors.password)
                    ),
                    React.createElement('div', null,
                        React.createElement('label', { htmlFor: 'password_confirmation', className: 'sr-only' }, 'Confirm Password'),
                        React.createElement('input', {
                            id: 'password_confirmation',
                            name: 'password_confirmation',
                            type: 'password',
                            autoComplete: 'new-password',
                            required: true,
                            className: 'appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm',
                            placeholder: 'Confirm Password',
                            value: formData.password_confirmation,
                            onChange: handleChange
                        }),
                        errors.password_confirmation && React.createElement('p', { className: 'mt-1 text-sm text-red-600' }, errors.password_confirmation)
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
                            'Creating account...'
                        ) : 'Create account'
                    )
                )
            )
        )
    );
};

export default Register;
