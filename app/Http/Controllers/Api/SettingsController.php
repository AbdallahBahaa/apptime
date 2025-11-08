<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use App\Models\ActivityLog;
use App\Models\Penalty;
use App\Models\Setting;
use Illuminate\Support\Facades\Auth;

class SettingsController extends Controller
{
    public function getUserSettings()
    {
        $user = auth()->user();
        return response()->json([
            'idle_timeout' => $user->idle_timeout ?? 30,
            'email_notifications' => $user->email_notifications ?? true,
            'theme' => $user->theme ?? 'light'
        ]);
    }

    public function updateUserSettings(Request $request)
    {
        $request->validate([
            'idle_timeout' => 'integer|min:5|max:3600',
            'email_notifications' => 'boolean',
            'theme' => 'in:light,dark,auto'
        ]);

        $user = auth()->user();
        $user->update($request->only(['idle_timeout', 'email_notifications', 'theme']));

        return response()->json(['message' => 'Settings updated successfully']);
    }

    public function applyIdlePenalty(Request $request)
    {
        $request->validate([
            'user_id' => 'required|exists:users,id',
            'idle_duration' => 'required|integer|min:1'
        ]);

        $user = User::find($request->user_id);

        // Apply penalty
        Penalty::create([
            'user_id' => $user->id,
            'reason' => 'Auto-logout due to inactivity (' . $request->idle_duration . ' seconds)',
            'count' => 1,
            'date' => now(),
        ]);

        // Log the penalty action
        ActivityLog::create([
            'user_id' => $user->id,
            'action' => 'idle_penalty_applied',
            'model' => 'Penalty',
            'record_id' => null,
            'timestamp' => now(),
            'ip_address' => $request->ip(),
            'user_agent' => $request->userAgent(),
            'device_info' => json_encode(['browser' => 'Unknown', 'os' => 'Unknown', 'device' => 'Unknown']),
        ]);

        return response()->json(['status' => 'penalty_applied']);
    }

    public function getSystemSettings()
    {
        return response()->json([
            'default_idle_timeout' => Setting::get('default_idle_timeout', 5),
        ]);
    }

    public function updateSystemSettings(Request $request)
    {
        $request->validate([
            'default_idle_timeout' => 'required|integer|min:5|max:3600',
        ]);

        Setting::set('default_idle_timeout', $request->default_idle_timeout, 'integer', 'Default idle timeout in seconds for all users');

        return response()->json(['message' => 'System settings updated successfully']);
    }
}
