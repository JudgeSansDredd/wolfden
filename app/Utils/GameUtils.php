<?php

namespace App\Utils;

use App\Models\Game;
use Carbon\Carbon;

class GameUtils {

    public static function getCurrentGame() {
        $game = Game::orderBy('created_at')->latest();
        return !empty($game) ? $game : false;
    }

    public static function getCurrentRound(Game $game) {
        $round = $game->rounds()->latest();
        return !empty($round) ? $round : false;
    }
}