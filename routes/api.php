<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\SettingsController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// Protected API routes
Route::middleware(['auth'])->group(function () {
    // Dashboard data
    Route::get('/dashboard', [DashboardController::class, 'getDashboardData']);

    // User settings
    Route::get('/user/settings', [SettingsController::class, 'getUserSettings']);
    Route::put('/user/settings', [SettingsController::class, 'updateUserSettings']);

    // Idle monitoring
    Route::post('/idle-penalty', [SettingsController::class, 'applyIdlePenalty']);
    Route::get('/user/idle-timeout', [SettingsController::class, 'getIdleTimeout']);

    // Admin routes
    Route::middleware(['admin'])->prefix('admin')->group(function () {
        Route::get('/stats', [AdminController::class, 'getStats']);
        Route::get('/users', [AdminController::class, 'getUsersApi']);
        Route::get('/users/{user}', [AdminController::class, 'getUserApi']);
        Route::put('/users/{user}/role', [AdminController::class, 'updateUserRoleApi']);
        Route::get('/recent-activities', [AdminController::class, 'getRecentActivities']);
    });

    // System settings - read access for all authenticated users, write for admins
    Route::prefix('system')->group(function () {
        Route::get('/settings', [SettingsController::class, 'getSystemSettings']);
        Route::middleware(['admin'])->put('/settings', [SettingsController::class, 'updateSystemSettings']);
    });
});
