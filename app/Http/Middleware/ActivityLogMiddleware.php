<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\ActivityLog;
use App\Events\ActivityLogged;
use Symfony\Component\HttpFoundation\Response;

class ActivityLogMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $response = $next($request);

        if (Auth::check()) {
            $this->logActivity($request, $response);
        }

        return $response;
    }

    protected function logActivity(Request $request, Response $response)
    {
        $user = Auth::user();
        $method = $request->method();
        $path = $request->path();

        // Determine action based on method and path
        $action = $this->determineAction($method, $path);

        if ($action) {
            $activityLog = ActivityLog::create([
                'user_id' => $user->id,
                'action' => $action,
                'model' => $this->getModelFromPath($path),
                'record_id' => $this->getRecordIdFromPath($path),
                'timestamp' => now(),
                'ip_address' => $request->ip(),
                'user_agent' => $request->userAgent(),
                'device_info' => $this->getDeviceInfo($request),
            ]);

            // Fire event for additional processing
            event(new ActivityLogged($activityLog));
        }
    }

    protected function determineAction($method, $path)
    {
        // Skip logging for certain paths like assets, API, etc.
        if (str_contains($path, 'api/') || str_contains($path, '_debugbar') || str_contains($path, 'livewire')) {
            return null;
        }

        switch ($method) {
            case 'POST':
                return 'create';
            case 'PUT':
            case 'PATCH':
                return 'update';
            case 'DELETE':
                return 'delete';
            case 'GET':
                // Only log GET for specific paths, not all views
                if (preg_match('/\/\d+$/', $path)) { // Ends with ID, likely a show/view
                    return 'read';
                }
                return null;
            default:
                return null;
        }
    }

    protected function getModelFromPath($path)
    {
        // Extract model name from path, e.g., /users/1 -> User
        $segments = explode('/', $path);
        if (count($segments) >= 2 && is_numeric($segments[count($segments) - 1])) {
            $model = $segments[count($segments) - 2];
            return ucfirst(str_singular($model)); // users -> User
        }
        return null;
    }

    protected function getRecordIdFromPath($path)
    {
        // Extract ID from path, e.g., /users/1 -> 1
        $segments = explode('/', $path);
        if (count($segments) >= 2 && is_numeric($segments[count($segments) - 1])) {
            return $segments[count($segments) - 1];
        }
        return null;
    }

    protected function getDeviceInfo(Request $request)
    {
        $userAgent = $request->userAgent();
        // Simple device info extraction
        $deviceInfo = [
            'browser' => $this->getBrowser($userAgent),
            'os' => $this->getOS($userAgent),
            'device' => $this->getDevice($userAgent),
        ];
        return $deviceInfo;
    }

    protected function getBrowser($userAgent)
    {
        if (strpos($userAgent, 'Chrome') !== false) return 'Chrome';
        if (strpos($userAgent, 'Firefox') !== false) return 'Firefox';
        if (strpos($userAgent, 'Safari') !== false) return 'Safari';
        if (strpos($userAgent, 'Edge') !== false) return 'Edge';
        return 'Unknown';
    }

    protected function getOS($userAgent)
    {
        if (strpos($userAgent, 'Windows') !== false) return 'Windows';
        if (strpos($userAgent, 'Mac') !== false) return 'MacOS';
        if (strpos($userAgent, 'Linux') !== false) return 'Linux';
        if (strpos($userAgent, 'Android') !== false) return 'Android';
        if (strpos($userAgent, 'iOS') !== false) return 'iOS';
        return 'Unknown';
    }

    protected function getDevice($userAgent)
    {
        if (strpos($userAgent, 'Mobile') !== false) return 'Mobile';
        if (strpos($userAgent, 'Tablet') !== false) return 'Tablet';
        return 'Desktop';
    }
}
