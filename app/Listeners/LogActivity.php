<?php

namespace App\Listeners;

use App\Events\ActivityLogged;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Support\Facades\Log;

class LogActivity implements ShouldQueue
{
    /**
     * Create the event listener.
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     */
    public function handle(ActivityLogged $event): void
    {
        $activity = $event->activityLog;

        // Log to Laravel log file for additional tracking
        Log::info('Activity Logged', [
            'user_id' => $activity->user_id,
            'action' => $activity->action,
            'model' => $activity->model,
            'record_id' => $activity->record_id,
            'ip_address' => $activity->ip_address,
            'timestamp' => $activity->timestamp,
        ]);

        // Additional processing can be added here, like sending notifications
        // or triggering other events based on activity type
    }
}
