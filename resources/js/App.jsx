import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './hooks/useAuth';
import { useIdleMonitor } from './hooks/useIdleMonitor';
import Layout from './components/Layout.js';
import Welcome from './components/Welcome.js';
import Dashboard from './components/Dashboard';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Settings from './components/settings/Settings';
import AdminDashboard from './components/admin/AdminDashboard';
import Users from './components/admin/Users';
import UserDetail from './components/admin/UserDetail';

// Protected Route component
const ProtectedRoute = ({ children, adminOnly = false }) => {
    const { user, loading } = useAuth();

    if (loading) {
        return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
    }

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    if (adminOnly && user.role !== 'admin') {
        return <Navigate to="/dashboard" replace />;
    }

    return children;
};

// Public Route component (redirects to dashboard if authenticated)
const PublicRoute = ({ children }) => {
    const { user, loading } = useAuth();

    if (loading) {
        return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
    }

    if (user) {
        return <Navigate to="/dashboard" replace />;
    }

    return children;
};

function AppRoutes() {
    return (
        <Routes>
            {/* Public routes */}
            <Route path="/" element={<Welcome />} />
            <Route path="/login" element={
                <PublicRoute>
                    <Login />
                </PublicRoute>
            } />
            <Route path="/register" element={
                <PublicRoute>
                    <Register />
                </PublicRoute>
            } />

            {/* Protected routes */}
            <Route path="/dashboard" element={
                <ProtectedRoute>
                    <Layout>
                        <Dashboard />
                    </Layout>
                </ProtectedRoute>
            } />

            <Route path="/settings" element={
                <ProtectedRoute adminOnly={true}>
                    <Layout>
                        <Settings />
                    </Layout>
                </ProtectedRoute>
            } />

            {/* Admin routes */}
            <Route path="/admin/dashboard" element={
                <ProtectedRoute adminOnly={true}>
                    <Layout>
                        <AdminDashboard />
                    </Layout>
                </ProtectedRoute>
            } />

            <Route path="/admin/users" element={
                <ProtectedRoute adminOnly={true}>
                    <Layout>
                        <Users />
                    </Layout>
                </ProtectedRoute>
            } />

            <Route path="/admin/users/:id" element={
                <ProtectedRoute adminOnly={true}>
                    <Layout>
                        <UserDetail />
                    </Layout>
                </ProtectedRoute>
            } />

            {/* Catch all route */}
            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    );
}

function App() {
    console.log('App component rendered');
    return (
        <AuthProvider>
            <IdleMonitorWrapper />
        </AuthProvider>
    );
}

// Wrapper component to use hooks
function IdleMonitorWrapper() {
    const { user, loading } = useAuth();

    console.log('IdleMonitorWrapper rendered, user:', user, 'loading:', loading);

    // Initialize idle monitoring when user is authenticated
    useIdleMonitor();

    if (loading) {
        return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <AppRoutes />
        </div>
    );
}

// Test component to verify idle monitoring
function TestIdleMonitor() {
    const { user } = useAuth();

    // Force idle monitor to run even without user for testing
    React.useEffect(() => {
        console.log('TestIdleMonitor: Starting idle monitor test');

        const resetTimers = () => {
            console.log('TestIdleMonitor: Resetting timers');

            // Clear any existing timers
            if (window.idleTimeout) clearTimeout(window.idleTimeout);
            if (window.warningTimeout) clearTimeout(window.warningTimeout);
            if (window.logoutTimeout) clearTimeout(window.logoutTimeout);

            // Set alert timer (5 seconds)
            window.idleTimeout = setTimeout(() => {
                console.log('TestIdleMonitor: Alert timer triggered');
                alert('Idle Alert: You have been inactive. Please continue working.');
                console.log('Idle alert shown');

                // Set warning timer (5 more seconds = 10 total)
                window.warningTimeout = setTimeout(() => {
                    console.log('TestIdleMonitor: Warning timer triggered');
                    const continueWorking = confirm('Idle Warning: You have been inactive again. This is your second warning.\n\nClick OK to continue working or Cancel to logout now.');
                    console.log('Idle warning shown');

                    if (!continueWorking) {
                        console.log('User chose to logout');
                        return;
                    }

                    // Set logout timer (5 more seconds = 15 total)
                    window.logoutTimeout = setTimeout(() => {
                        console.log('TestIdleMonitor: Logout timer triggered');
                        alert('You have been logged out due to repeated inactivity.');
                        console.log('Auto logout due to inactivity');
                    }, 5000);
                }, 5000);
            }, 5000);
        };

        // Activity events
        const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart', 'click'];

        const handleActivity = () => {
            console.log('TestIdleMonitor: Activity detected, resetting timers');
            resetTimers();
        };

        // Add event listeners
        events.forEach(event => {
            document.addEventListener(event, handleActivity, true);
        });

        // Start timers
        resetTimers();

        // Cleanup
        return () => {
            events.forEach(event => {
                document.removeEventListener(event, handleActivity, true);
            });
            if (window.idleTimeout) clearTimeout(window.idleTimeout);
            if (window.warningTimeout) clearTimeout(window.warningTimeout);
            if (window.logoutTimeout) clearTimeout(window.logoutTimeout);
        };
    }, []);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-md">
                <h1 className="text-2xl font-bold text-gray-900 mb-4">Idle Monitor Test</h1>
                <p className="text-gray-600 mb-4">
                    Stay inactive for 5 seconds to see the idle alert.
                </p>
                <p className="text-sm text-gray-500">
                    Check the browser console for debug messages.
                </p>
                <p className="text-xs text-gray-400 mt-2">
                    User: {user ? user.name : 'No user (testing mode)'}
                </p>
            </div>
        </div>
    );
}

export default App;
