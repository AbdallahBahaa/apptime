<?php

namespace App\Events;

use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;
use App\Models\ActivityLog;

class ActivityLogged
{
    use Dispatchable, SerializesModels;

    public $activityLog;

    /**
     * Create a new event instance.
     */
    public function __construct(ActivityLog $activityLog)
    {
        $this->activityLog = $activityLog;
    }
}
