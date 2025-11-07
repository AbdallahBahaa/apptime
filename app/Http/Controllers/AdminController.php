<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\ActivityLog;
use App\Models\Penalty;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class AdminController extends Controller
{
    /**
     * Show admin dashboard
     */
    public function dashboard()
    {
        // System-wide statistics
        $stats = [
            'total_users' => User::count(),
            'total_admins' => User::where('role', 'admin')->count(),
            'total_regular_users' => User::where('role', 'user')->count(),
            'total_activity_logs' => ActivityLog::count(),
            'total_penalties' => Penalty::count(),
            'recent_activities' => ActivityLog::with('user')->latest()->take(10)->get(),
            'recent_penalties' => Penalty::with('user')->latest()->take(10)->get(),
        ];

        // Activity logs by user
        $activityByUser = ActivityLog::select('user_id', DB::raw('count(*) as count'))
            ->with('user')
            ->groupBy('user_id')
            ->orderBy('count', 'desc')
            ->take(10)
            ->get();

        // Penalties by user
        $penaltiesByUser = Penalty::select('user_id', DB::raw('count(*) as count'))
            ->with('user')
            ->groupBy('user_id')
            ->orderBy('count', 'desc')
            ->take(10)
            ->get();

        return view('admin.dashboard', compact('stats', 'activityByUser', 'penaltiesByUser'));
    }

    /**
     * Show all users
     */
    public function users()
    {
        $users = User::withCount(['activityLogs', 'penalties'])->paginate(20);
        return view('admin.users', compact('users'));
    }

    /**
     * Show user details
     */
    public function showUser(User $user)
    {
        $user->load(['activityLogs' => function($query) {
            $query->latest()->take(50);
        }, 'penalties' => function($query) {
            $query->latest()->take(20);
        }]);

        return view('admin.user-detail', compact('user'));
    }

    /**
     * Update user role
     */
    public function updateUserRole(Request $request, User $user)
    {
        $request->validate([
            'role' => 'required|in:user,admin'
        ]);

        $user->update(['role' => $request->role]);

        return redirect()->back()->with('success', 'User role updated successfully');
    }

    /**
     * Show all activity logs
     */
    public function activityLogs(Request $request)
    {
        $query = ActivityLog::with('user');

        // Filter by user
        if ($request->user_id) {
            $query->where('user_id', $request->user_id);
        }

        // Filter by action
        if ($request->action) {
            $query->where('action', 'like', '%' . $request->action . '%');
        }

        // Filter by date range
        if ($request->date_from) {
            $query->whereDate('created_at', '>=', $request->date_from);
        }
        if ($request->date_to) {
            $query->whereDate('created_at', '<=', $request->date_to);
        }

        $activityLogs = $query->latest()->paginate(50);

        $users = User::select('id', 'name', 'email')->get();

        return view('admin.activity-logs', compact('activityLogs', 'users'));
    }

    /**
     * Show all penalties
     */
    public function penalties(Request $request)
    {
        $query = Penalty::with('user');

        // Filter by user
        if ($request->user_id) {
            $query->where('user_id', $request->user_id);
        }

        // Filter by reason
        if ($request->reason) {
            $query->where('reason', 'like', '%' . $request->reason . '%');
        }

        // Filter by date range
        if ($request->date_from) {
            $query->whereDate('created_at', '>=', $request->date_from);
        }
        if ($request->date_to) {
            $query->whereDate('created_at', '<=', $request->date_to);
        }

        $penalties = $query->latest()->paginate(50);

        $users = User::select('id', 'name', 'email')->get();

        return view('admin.penalties', compact('penalties', 'users'));
    }

    /**
     * System settings
     */
    public function settings()
    {
        return view('admin.settings');
    }
}
