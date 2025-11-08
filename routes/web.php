<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\SettingsController;
use App\Http\Controllers\AdminController;

Route::get('/', function () {
    return view('welcome');
});

Auth::routes(['middleware' => 'guest']);

Route::middleware(['auth'])->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');

    // Admin-only routes
    Route::middleware(['admin'])->group(function () {
        Route::get('/settings', [SettingsController::class, 'index'])->name('settings');
        Route::post('/settings/update-idle-timeout', [SettingsController::class, 'updateIdleTimeout'])->name('settings.update.idle.timeout');
    });

    // API routes for all authenticated users
    Route::get('/api/user/idle-timeout', [SettingsController::class, 'getIdleTimeout'])->name('api.user.idle.timeout');
    Route::post('/api/log-idle', [SettingsController::class, 'logIdle'])->name('api.log.idle');
    Route::post('/api/apply-penalty-logout', [SettingsController::class, 'applyPenaltyAndLogout'])->name('api.apply.penalty.logout');

    // User settings API
    Route::get('/api/user/settings', [SettingsController::class, 'getUserSettings'])->name('api.user.settings');
    Route::put('/api/user/settings', [SettingsController::class, 'updateUserSettings'])->name('api.user.settings.update');
});

// Admin routes
Route::middleware(['auth', 'admin'])->prefix('admin')->name('admin.')->group(function () {
    Route::get('/dashboard', [AdminController::class, 'dashboard'])->name('dashboard');
    Route::get('/users', [AdminController::class, 'users'])->name('users');
    Route::get('/users/{user}', [AdminController::class, 'showUser'])->name('users.show');
    Route::post('/users/{user}/update-role', [AdminController::class, 'updateUserRole'])->name('users.update.role');
    Route::get('/activity-logs', [AdminController::class, 'activityLogs'])->name('activity.logs');
    Route::get('/penalties', [AdminController::class, 'penalties'])->name('penalties');
    Route::get('/settings', [AdminController::class, 'settings'])->name('settings');
});
