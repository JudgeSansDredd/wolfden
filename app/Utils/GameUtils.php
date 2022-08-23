<?php

namespace App\Utils;

use App\Models\Game;
use App\Models\Round;
use App\Models\User;

class GameUtils {

    private static function getCurrentGame() {
        if(!auth()->check()) {
            return null;
        }
        $user = User::find(auth()->user()->id);
        $game = $user->games()->latest()->first();
        return $game;
    }

    private static function getCurrentRound(?Game $game) {
        if(empty($game)) {
            return null;
        }
        return $game->rounds()->latest()->first();
    }

    private static function getCurrentAttack(?Round $round) {
        if(empty($round)) {
            return null;
        }
        return $round->wolfAttacks()->latest()->first();
    }

    public static function getCurrentAll() {
        $game = self::getCurrentGame();
        $round = self::getCurrentRound($game);
        $attack = self::getCurrentAttack($round);
        return compact('game', 'round', 'attack');
    }
}