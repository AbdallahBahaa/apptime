<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\ActivityLog;
use App\Models\Penalty;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class AdminController extends Controller
{
    public function getStats()
    {
        return response()->json([
            'totalUsers' => User::count(),
            'activeUsers' => User::where('email_verified_at', '!=', null)->count(),
            'totalActivities' => ActivityLog::count(),
            'totalPenalties' => Penalty::count()
        ]);
    }

    public function getUsersApi(Request $request)
    {
        $query = User::query();

        if ($request->search) {
            $query->where('name', 'like', '%' . $request->search . '%')
                  ->orWhere('email', 'like', '%' . $request->search . '%');
        }

        $users = $query->withCount(['activityLogs', 'penalties'])
                      ->paginate($request->per_page ?? 10);

        return response()->json($users);
    }

    public function getUserApi(User $user)
    {
        $user->load(['activityLogs' => function($query) {
            $query->latest()->take(50);
        }, 'penalties' => function($query) {
            $query->latest()->take(20);
        }]);

        return response()->json($user);
    }

    public function updateUserRoleApi(Request $request, User $user)
    {
        $request->validate([
            'role' => 'required|in:user,admin'
        ]);

        $user->update(['role' => $request->role]);

        return response()->json(['message' => 'User role updated successfully']);
    }

    public function getRecentActivities()
    {
        $activities = ActivityLog::with('user:id,name,email')
                                ->latest()
                                ->take(10)
                                ->get()
                                ->map(function($activity) {
                                    return [
                                        'id' => $activity->id,
                                        'user_name' => $activity->user->name,
                                        'action' => $activity->action,
                                        'created_at' => $activity->created_at
                                    ];
                                });

        return response()->json($activities);
    }
}
