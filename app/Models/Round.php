<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Round extends Model
{
    use HasFactory;

    protected $fillable = [
        'round_number',
        'action_time_ends_at',
        'team_time_ends_at',
    ];

    protected $casts = [
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
        'action_time_ends_at' => 'datetime',
        'team_time_ends_at' => 'datetime'
    ];

    public function game() {
        return $this->belongsTo(Game::class, 'game_id', 'id');
    }

    public function wolfAttacks() {
        return $this->hasMany(WolfAttack::class, 'round_id', 'id');
    }

    public function getResolvedAttribute() {
        return Carbon::now() > $this->team_time_ends_at;
    }
}
