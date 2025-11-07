@extends('layouts.app')

@section('content')
<div class="py-12">
    <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
        <!-- Header -->
        <div class="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg shadow-lg p-8 mb-8">
            <div class="text-center">
                <h1 class="text-4xl font-bold text-white mb-2">Activity Dashboard</h1>
                <p class="text-blue-100 text-lg">Monitor your activities, idle sessions, and system penalties</p>
            </div>
        </div>

        <!-- Stats Cards -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <!-- Actions per Employee -->
            <div class="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                <div class="bg-gradient-to-r from-blue-500 to-blue-600 p-6">
                    <div class="flex items-center">
                        <div class="flex-shrink-0">
                            <svg class="h-8 w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                            </svg>
                        </div>
                        <div class="ml-4">
                            <h3 class="text-white text-lg font-semibold">Your Actions</h3>
                            <p class="text-blue-100 text-sm">Last 30 days</p>
                        </div>
                    </div>
                </div>
                <div class="p-6">
                    <div class="space-y-3">
                        @forelse($actionsPerEmployee as $action)
                            <div class="flex justify-between items-center">
                                <span class="text-gray-600 dark:text-gray-300 text-sm">{{ $action->name }}</span>
                                <span class="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300 px-3 py-1 rounded-full text-sm font-medium">
                                    {{ $action->total_actions }}
                                </span>
                            </div>
                        @empty
                            <p class="text-gray-500 dark:text-gray-400 text-sm">No actions recorded</p>
                        @endforelse
                    </div>
                </div>
            </div>

            <!-- Idle Sessions -->
            <div class="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                <div class="bg-gradient-to-r from-yellow-500 to-orange-500 p-6">
                    <div class="flex items-center">
                        <div class="flex-shrink-0">
                            <svg class="h-8 w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                            </svg>
                        </div>
                        <div class="ml-4">
                            <h3 class="text-white text-lg font-semibold">Idle Sessions</h3>
                            <p class="text-orange-100 text-sm">Last 30 days</p>
                        </div>
                    </div>
                </div>
                <div class="p-6">
                    <div class="space-y-3">
                        @forelse($idleSessions as $idle)
                            <div class="flex justify-between items-center">
                                <span class="text-gray-600 dark:text-gray-300 text-sm">{{ $idle->name }}</span>
                                <span class="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300 px-3 py-1 rounded-full text-sm font-medium">
                                    {{ $idle->idle_count }}
                                </span>
                            </div>
                        @empty
                            <p class="text-gray-500 dark:text-gray-400 text-sm">No idle sessions</p>
                        @endforelse
                    </div>
                </div>
            </div>

            <!-- Penalties -->
            <div class="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                <div class="bg-gradient-to-r from-red-500 to-pink-500 p-6">
                    <div class="flex items-center">
                        <div class="flex-shrink-0">
                            <svg class="h-8 w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
                            </svg>
                        </div>
                        <div class="ml-4">
                            <h3 class="text-white text-lg font-semibold">Penalties</h3>
                            <p class="text-pink-100 text-sm">Last 30 days</p>
                        </div>
                    </div>
                </div>
                <div class="p-6">
                    <div class="space-y-3">
                        @forelse($penalties as $penalty)
                            <div class="flex justify-between items-center">
                                <span class="text-gray-600 dark:text-gray-300 text-sm">{{ $penalty->name }}</span>
                                <span class="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300 px-3 py-1 rounded-full text-sm font-medium">
                                    {{ $penalty->total_penalties }}
                                </span>
                            </div>
                        @empty
                            <p class="text-gray-500 dark:text-gray-400 text-sm">No penalties</p>
                        @endforelse
                    </div>
                </div>
            </div>
        </div>

        <!-- Activity Overview -->
        <div class="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
            <div class="p-6">
                <div class="flex items-center justify-between mb-6">
                    <div>
                        <h2 class="text-2xl font-bold text-gray-900 dark:text-gray-100">Activity Overview</h2>
                        <p class="text-gray-600 dark:text-gray-400 mt-1">Real-time monitoring of your activities</p>
                    </div>
                    <div class="flex items-center space-x-2">
                        <div class="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                        <span class="text-sm text-gray-600 dark:text-gray-400">System Active</span>
                    </div>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div class="text-center">
                        <div class="bg-blue-50 dark:bg-blue-900 rounded-lg p-4">
                            <div class="text-2xl font-bold text-blue-600 dark:text-blue-400">{{ $actionsPerEmployee->sum('total_actions') }}</div>
                            <div class="text-sm text-gray-600 dark:text-gray-400">Total Actions</div>
                        </div>
                    </div>
                    <div class="text-center">
                        <div class="bg-yellow-50 dark:bg-yellow-900 rounded-lg p-4">
                            <div class="text-2xl font-bold text-yellow-600 dark:text-yellow-400">{{ $idleSessions->sum('idle_count') }}</div>
                            <div class="text-sm text-gray-600 dark:text-gray-400">Idle Sessions</div>
                        </div>
                    </div>
                    <div class="text-center">
                        <div class="bg-red-50 dark:bg-red-900 rounded-lg p-4">
                            <div class="text-2xl font-bold text-red-600 dark:text-red-400">{{ $penalties->sum('total_penalties') }}</div>
                            <div class="text-sm text-gray-600 dark:text-gray-400">Penalties Applied</div>
                        </div>
                    </div>
                    <div class="text-center">
                        <div class="bg-green-50 dark:bg-green-900 rounded-lg p-4">
                            <div class="text-2xl font-bold text-green-600 dark:text-green-400">{{ $actionsPerEmployee->count() }}</div>
                            <div class="text-sm text-gray-600 dark:text-gray-400">Active Users</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
