import React from 'react';

const Welcome = () => {
    return React.createElement('div', { className: 'min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100' },
        // Hero Section
        React.createElement('div', { className: 'relative overflow-hidden' },
            React.createElement('div', { className: 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24' },
                React.createElement('div', { className: 'text-center' },
                    React.createElement('h1', { className: 'text-5xl md:text-6xl font-bold text-gray-900 mb-6' },
                        'Welcome to ',
                        React.createElement('span', { className: 'text-indigo-600' }, 'AppTime')
                    ),
                    React.createElement('p', { className: 'text-xl text-gray-600 mb-8 max-w-3xl mx-auto' },
                        'Monitor employee activity, track productivity, and manage time effectively with our comprehensive activity monitoring system.'
                    ),
                    React.createElement('div', { className: 'flex flex-col sm:flex-row gap-4 justify-center' },
                        React.createElement('a', { href: '/register', className: 'bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-lg text-lg font-semibold transition duration-200' }, 'Get Started'),
                        React.createElement('a', { href: '/login', className: 'bg-white hover:bg-gray-50 text-indigo-600 border-2 border-indigo-600 px-8 py-3 rounded-lg text-lg font-semibold transition duration-200' }, 'Sign In')
                    )
                )
            )
        ),

        // Features Section
        React.createElement('div', { className: 'py-24 bg-white' },
            React.createElement('div', { className: 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8' },
                React.createElement('div', { className: 'text-center mb-16' },
                    React.createElement('h2', { className: 'text-3xl font-bold text-gray-900 mb-4' }, 'Powerful Features'),
                    React.createElement('p', { className: 'text-lg text-gray-600' }, 'Everything you need to monitor and improve productivity')
                ),

                React.createElement('div', { className: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8' },
                    // Feature 1
                    React.createElement('div', { className: 'bg-gray-50 rounded-lg p-6 text-center' },
                        React.createElement('div', { className: 'w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mx-auto mb-4' },
                            React.createElement('svg', { className: 'w-6 h-6 text-indigo-600', fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' },
                                React.createElement('path', { strokeLinecap: 'round', strokeLinejoin: 'round', strokeWidth: '2', d: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z' })
                            )
                        ),
                        React.createElement('h3', { className: 'text-xl font-semibold text-gray-900 mb-2' }, 'Activity Monitoring'),
                        React.createElement('p', { className: 'text-gray-600' }, 'Track user activities in real-time with detailed logging and analytics.')
                    ),

                    // Feature 2
                    React.createElement('div', { className: 'bg-gray-50 rounded-lg p-6 text-center' },
                        React.createElement('div', { className: 'w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mx-auto mb-4' },
                            React.createElement('svg', { className: 'w-6 h-6 text-indigo-600', fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' },
                                React.createElement('path', { strokeLinecap: 'round', strokeLinejoin: 'round', strokeWidth: '2', d: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z' })
                            )
                        ),
                        React.createElement('h3', { className: 'text-xl font-semibold text-gray-900 mb-2' }, 'Idle Time Detection'),
                        React.createElement('p', { className: 'text-gray-600' }, 'Automatically detect idle periods and enforce productivity policies.')
                    ),

                    // Feature 3
                    React.createElement('div', { className: 'bg-gray-50 rounded-lg p-6 text-center' },
                        React.createElement('div', { className: 'w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mx-auto mb-4' },
                            React.createElement('svg', { className: 'w-6 h-6 text-indigo-600', fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' },
                                React.createElement('path', { strokeLinecap: 'round', strokeLinejoin: 'round', strokeWidth: '2', d: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' })
                            )
                        ),
                        React.createElement('h3', { className: 'text-xl font-semibold text-gray-900 mb-2' }, 'Penalty System'),
                        React.createElement('p', { className: 'text-gray-600' }, 'Manage penalties and rewards based on activity and compliance.')
                    ),

                    // Feature 4
                    React.createElement('div', { className: 'bg-gray-50 rounded-lg p-6 text-center' },
                        React.createElement('div', { className: 'w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mx-auto mb-4' },
                            React.createElement('svg', { className: 'w-6 h-6 text-indigo-600', fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' },
                                React.createElement('path', { strokeLinecap: 'round', strokeLinejoin: 'round', strokeWidth: '2', d: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z' }),
                                React.createElement('path', { strokeLinecap: 'round', strokeLinejoin: 'round', strokeWidth: '2', d: 'M15 12a3 3 0 11-6 0 3 3 0 016 0z' })
                            )
                        ),
                        React.createElement('h3', { className: 'text-xl font-semibold text-gray-900 mb-2' }, 'Admin Dashboard'),
                        React.createElement('p', { className: 'text-gray-600' }, 'Comprehensive admin panel for user management and system configuration.')
                    ),

                    // Feature 5
                    React.createElement('div', { className: 'bg-gray-50 rounded-lg p-6 text-center' },
                        React.createElement('div', { className: 'w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mx-auto mb-4' },
                            React.createElement('svg', { className: 'w-6 h-6 text-indigo-600', fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' },
                                React.createElement('path', { strokeLinecap: 'round', strokeLinejoin: 'round', strokeWidth: '2', d: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' })
                            )
                        ),
                        React.createElement('h3', { className: 'text-xl font-semibold text-gray-900 mb-2' }, 'User Management'),
                        React.createElement('p', { className: 'text-gray-600' }, 'Complete user lifecycle management with roles and permissions.')
                    ),

                    // Feature 6
                    React.createElement('div', { className: 'bg-gray-50 rounded-lg p-6 text-center' },
                        React.createElement('div', { className: 'w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mx-auto mb-4' },
                            React.createElement('svg', { className: 'w-6 h-6 text-indigo-600', fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' },
                                React.createElement('path', { strokeLinecap: 'round', strokeLinejoin: 'round', strokeWidth: '2', d: 'M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' })
                            )
                        ),
                        React.createElement('h3', { className: 'text-xl font-semibold text-gray-900 mb-2' }, 'Detailed Reports'),
                        React.createElement('p', { className: 'text-gray-600' }, 'Generate comprehensive reports on user activity and system performance.')
                    )
                )
            )
        ),

        // Stats Section
        React.createElement('div', { className: 'py-24 bg-indigo-600' },
            React.createElement('div', { className: 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8' },
                React.createElement('div', { className: 'text-center text-white' },
                    React.createElement('h2', { className: 'text-3xl font-bold mb-8' }, 'Trusted by Organizations Worldwide'),
                    React.createElement('div', { className: 'grid grid-cols-1 md:grid-cols-3 gap-8' },
                        React.createElement('div', null,
                            React.createElement('div', { className: 'text-4xl font-bold mb-2' }, '1000+'),
                            React.createElement('div', { className: 'text-indigo-200' }, 'Active Users')
                        ),
                        React.createElement('div', null,
                            React.createElement('div', { className: 'text-4xl font-bold mb-2' }, '50+'),
                            React.createElement('div', { className: 'text-indigo-200' }, 'Organizations')
                        ),
                        React.createElement('div', null,
                            React.createElement('div', { className: 'text-4xl font-bold mb-2' }, '99.9%'),
                            React.createElement('div', { className: 'text-indigo-200' }, 'Uptime')
                        )
                    )
                )
            )
        )
    );
};

export default Welcome;
