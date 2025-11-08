<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->integer('idle_timeout')->default(30)->after('password');
            $table->boolean('email_notifications')->default(true)->after('idle_timeout');
            $table->enum('theme', ['light', 'dark', 'auto'])->default('light')->after('email_notifications');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn(['idle_timeout', 'email_notifications', 'theme']);
        });
    }
};
