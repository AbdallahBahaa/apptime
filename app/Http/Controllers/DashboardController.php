<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\ActivityLog;
use App\Models\Penalty;
use App\Models\User;
use Illuminate\Support\Facades\DB;

class DashboardController extends Controller
{
    public function index()
    {
        // Actions per employee (last 30 days)
        $actionsPerEmployee = ActivityLog::select('users.name', DB::raw('COUNT(*) as total_actions'))
            ->join('users', 'activity_logs.user_id', '=', 'users.id')
            ->where('activity_logs.created_at', '>=', now()->subDays(30))
            ->groupBy('users.id', 'users.name')
            ->orderBy('total_actions', 'desc')
            ->get();

        // Idle sessions (assuming idle is when no activity for more than idle_timeout)
        $idleSessions = User::select('users.name', DB::raw('COUNT(*) as idle_count'))
            ->join('activity_logs', 'users.id', '=', 'activity_logs.user_id')
            ->where('activity_logs.action', 'idle_detected')
            ->where('activity_logs.created_at', '>=', now()->subDays(30))
            ->groupBy('users.id', 'users.name')
            ->orderBy('idle_count', 'desc')
            ->get();

        // Penalties
        $penalties = Penalty::select('users.name', DB::raw('SUM(count) as total_penalties'))
            ->join('users', 'penalties.user_id', '=', 'users.id')
            ->where('penalties.created_at', '>=', now()->subDays(30))
            ->groupBy('users.id', 'users.name')
            ->orderBy('total_penalties', 'desc')
            ->get();

        return view('dashboard', compact('actionsPerEmployee', 'idleSessions', 'penalties'));
    }
}
