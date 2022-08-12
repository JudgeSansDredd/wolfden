<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class WolfAttack extends Model
{
    use HasFactory;

    public function round() {
        return $this->belongsTo(Round::class, 'round_id', 'id');
    }
}
