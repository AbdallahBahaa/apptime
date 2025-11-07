<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\ActivityLog;
use App\Models\Penalty;
use Illuminate\Support\Facades\Auth;

class SettingsController extends Controller
{
    public function index()
    {
        $users = User::all();
        return view('settings', compact('users'));
    }

    public function updateIdleTimeout(Request $request)
    {
        $request->validate([
            'user_id' => 'required|exists:users,id',
            'idle_timeout' => 'required|integer|min:1|max:3600', // 1 second to 1 hour
        ]);

        $user = User::find($request->user_id);
        $user->idle_timeout = $request->idle_timeout;
        $user->save();

        return redirect()->back()->with('success', 'Idle timeout updated successfully.');
    }

    public function getIdleTimeout()
    {
        return response()->json([
            'idle_timeout' => auth()->user()->idle_timeout ?? 5
        ]);
    }

    public function logIdle(Request $request)
    {
        $request->validate([
            'action' => 'required|string|in:idle_alert,idle_warning'
        ]);

        ActivityLog::create([
            'user_id' => auth()->id(),
            'action' => $request->action,
            'model' => null,
            'record_id' => null,
            'timestamp' => now(),
            'ip_address' => $request->ip(),
            'user_agent' => $request->userAgent(),
            'device_info' => json_encode(['browser' => 'Unknown', 'os' => 'Unknown', 'device' => 'Unknown']),
        ]);

        return response()->json(['status' => 'logged']);
    }

    public function applyPenaltyAndLogout(Request $request)
    {
        $user = auth()->user();

        // Apply penalty
        Penalty::create([
            'user_id' => $user->id,
            'reason' => 'Auto-logout due to inactivity',
            'count' => 1,
            'date' => now(),
        ]);

        // Log the penalty action
        ActivityLog::create([
            'user_id' => $user->id,
            'action' => 'penalty_applied',
            'model' => null,
            'record_id' => null,
            'timestamp' => now(),
            'ip_address' => $request->ip(),
            'user_agent' => $request->userAgent(),
            'device_info' => json_encode(['browser' => 'Unknown', 'os' => 'Unknown', 'device' => 'Unknown']),
        ]);

        // Logout
        auth()->logout();

        return response()->json(['status' => 'logged_out']);
    }
}
