<?php

namespace App\Utils;

use App\Models\Game;
use App\Models\Round;
use App\Models\User;

class GameUtils {

    private static function getCurrentGame($roomCode) {
        if(empty($roomCode) && !auth()->check()) {
            return null;
        }

        if(!empty($roomCode)) {
            return Game::where('room_code', strtoupper($roomCode))->first();
        } else {
            $user = User::find(auth()->user()->id);
            return $user->games()->latest()->first();
        }
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

    public static function getCurrentAll($roomCode = null) {
        $game = self::getCurrentGame($roomCode);
        $round = self::getCurrentRound($game);
        $attack = self::getCurrentAttack($round);
        return compact('game', 'round', 'attack');
    }

    public static function generateRoomCode() {
        $successful = false;
        while(!$successful) {
            $result = '';
            for ($i=0; $i < 4; $i++) {
                $result .= chr(rand(65,90));
            }
            $successful = Game::where('room_code', $result)->count() === 0;
        }
        return $result;
    }
}