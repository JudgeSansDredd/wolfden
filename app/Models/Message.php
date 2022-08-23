<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Message extends Model
{
    use HasFactory;

    protected $fillable = [
          'is_control'
        , 'message_string'
    ];

    public function game() {
        return $this->belongsTo(Game::class, 'game_id', 'id');
    }
}
