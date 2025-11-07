<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>{{ config('app.name', 'AppTime') }} - Employee Activity Monitoring</title>
    <link rel="preconnect" href="https://fonts.bunny.net">
    <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
    @if (file_exists(public_path('build/manifest.json')) || file_exists(public_path('hot')))
        @vite(['resources/css/app.css', 'resources/js/app.js'])
    @else
        <script src="https://cdn.tailwindcss.com"></script>
    @endif
</head>
<body class="bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen">
    <div class="container mx-auto px-4 py-16">
        <div class="max-w-4xl mx-auto text-center">
            <!-- Hero Section -->
            <div class="mb-16">
                <h1 class="text-5xl md:text-7xl font-bold text-gray-900 mb-6">
                    Welcome to <span class="text-indigo-600">{{ config('app.name', 'AppTime') }}</span>
                </h1>
                <p class="text-xl md:text-2xl text-gray-600 mb-8 max-w-2xl mx-auto">
                    Advanced Employee Activity Monitoring System with real-time tracking, idle detection, and comprehensive reporting.
                </p>
                <div class="flex flex-col sm:flex-row gap-4 justify-center">
                    <a href="{{ route('login') }}" class="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-8 rounded-lg transition duration-300 shadow-lg hover:shadow-xl">
                        Get Started
                    </a>
                    <a href="{{ route('register') }}" class="bg-white hover:bg-gray-50 text-indigo-600 font-semibold py-3 px-8 rounded-lg border-2 border-indigo-600 transition duration-300 shadow-lg hover:shadow-xl">
                        Create Account
                    </a>
                </div>
            </div>

            <!-- Features Grid -->
            <div class="grid md:grid-cols-3 gap-8 mb-16">
                <div class="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition duration-300">
                    <div class="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg class="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                        </svg>
                    </div>
                    <h3 class="text-xl font-semibold text-gray-900 mb-2">Real-time Monitoring</h3>
                    <p class="text-gray-600">Track employee activities in real-time with detailed logging and instant notifications.</p>
                </div>

                <div class="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition duration-300">
                    <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg class="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                    </div>
                    <h3 class="text-xl font-semibold text-gray-900 mb-2">Idle Detection</h3>
                    <p class="text-gray-600">Automatic idle time detection with customizable thresholds and penalty systems.</p>
                </div>

                <div class="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition duration-300">
                    <div class="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg class="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                        </svg>
                    </div>
                    <h3 class="text-xl font-semibold text-gray-900 mb-2">Comprehensive Reports</h3>
                    <p class="text-gray-600">Detailed dashboards with activity logs, idle sessions, and penalty tracking.</p>
                </div>
            </div>

            <!-- Stats Section -->
            <div class="bg-white rounded-xl shadow-lg p-8">
                <h2 class="text-3xl font-bold text-gray-900 mb-8">Why Choose AppTime?</h2>
                <div class="grid md:grid-cols-2 gap-8 text-left">
                    <div>
                        <h4 class="text-lg font-semibold text-gray-900 mb-2">Advanced Security</h4>
                        <p class="text-gray-600 mb-4">Secure authentication with role-based access control and encrypted data storage.</p>

                        <h4 class="text-lg font-semibold text-gray-900 mb-2">Customizable Settings</h4>
                        <p class="text-gray-600 mb-4">Configure idle timeouts, penalty thresholds, and monitoring preferences per user role.</p>
                    </div>
                    <div>
                        <h4 class="text-lg font-semibold text-gray-900 mb-2">Real-time Alerts</h4>
                        <p class="text-gray-600 mb-4">Instant notifications for idle periods with progressive warning system.</p>

                        <h4 class="text-lg font-semibold text-gray-900 mb-2">Detailed Analytics</h4>
                        <p class="text-gray-600 mb-4">Comprehensive reporting with charts, graphs, and exportable data.</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</body>
</html>
