import React, { useState, useEffect } from 'react';
import api from '../services/api';

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState({
    actionsPerEmployee: [],
    idleSessions: [],
    penalties: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const response = await api.getDashboardData();
      setDashboardData(response.data);
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-indigo-600"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-12">
      <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg shadow-lg p-8 mb-8 text-center">
          <h1 className="text-4xl font-bold text-white mb-2">Activity Dashboard</h1>
          <p className="text-blue-100 text-lg">
            Monitor your activities, idle sessions, and system penalties
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Actions per Employee */}
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6 flex items-center">
              <div className="flex-shrink-0">
                <svg
                  className="h-8 w-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
              <div className="ml-4">
                <h3 className="text-white text-lg font-semibold">Your Actions</h3>
                <p className="text-blue-100 text-sm">Last 30 days</p>
              </div>
            </div>
            <div className="p-6">
              <div className="space-y-3">
                {dashboardData.actionsPerEmployee.length > 0 ? (
                  dashboardData.actionsPerEmployee.map((action, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <span className="text-gray-600 dark:text-gray-300 text-sm">
                        {action.name}
                      </span>
                      <span className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300 px-3 py-1 rounded-full text-sm font-medium">
                        {action.total_actions}
                      </span>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 dark:text-gray-400 text-sm">
                    No actions recorded
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Activity Overview */}
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                  Activity Overview
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mt-1">
                  Real-time monitoring of your activities
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  System Active
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <div className="bg-blue-50 dark:bg-blue-900 rounded-lg p-4">
                  <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                    {dashboardData.actionsPerEmployee.reduce(
                      (sum, action) => sum + action.total_actions,
                      0
                    )}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Total Actions
                  </div>
                </div>
              </div>

              <div className="text-center">
                <div className="bg-yellow-50 dark:bg-yellow-900 rounded-lg p-4">
                  <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
                    {dashboardData.idleSessions.reduce(
                      (sum, session) => sum + session.idle_count,
                      0
                    )}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Idle Sessions
                  </div>
                </div>
              </div>

              <div className="text-center">
                <div className="bg-red-50 dark:bg-red-900 rounded-lg p-4">
                  <div className="text-2xl font-bold text-red-600 dark:text-red-400">
                    {dashboardData.penalties.reduce(
                      (sum, penalty) => sum + penalty.total_penalties,
                      0
                    )}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Penalties Applied
                  </div>
                </div>
              </div>

              <div className="text-center">
                <div className="bg-green-50 dark:bg-green-900 rounded-lg p-4">
                  <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                    {dashboardData.actionsPerEmployee.length}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Active Users
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
