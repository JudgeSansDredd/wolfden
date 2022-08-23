<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Game extends Model
{
    use HasFactory;

    protected $casts = [
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    public function user() {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }

    public function rounds() {
        return $this->hasMany(Round::class, 'game_id', 'id');
    }

    public function getCurrentRoundAttribute() {
        $round = $this->rounds()->latest();
        return !empty($round) ? $round : false;
    }

    public function messages() {
        return $this->hasMany(Message::class, 'game_id', 'id');
    }
}
