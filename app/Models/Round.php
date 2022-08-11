<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Round extends Model
{
    use HasFactory;

    protected $fillable = [
        'round_number',
        'game_id',
        'ends_at'
    ];

    protected $casts = [
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
        'ends_at' => 'datetime'
    ];

    public function game() {
        return $this->belongsTo(Game::class, 'game_id', 'id');
    }
}
