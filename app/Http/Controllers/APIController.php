<?php

namespace App\Http\Controllers;

use App\Events\WolfAttackEvent;
use App\Models\Game;
use App\Models\Round;
use Illuminate\Http\Request;

class APIController extends Controller
{
    public function wolfAttack(Request $request) {
        $request->validate([
            'attacking' => 'required|boolean'
        ]);
        $attacking = $request->attacking;
        WolfAttackEvent::dispatch($attacking);
        return response()->json(compact('attacking'), 200);
    }

    public function startNewGame(Request $request) {
        $request->validate([
            'confirmation' => 'required|string'
        ]);

        $confirmation = $request->confirmation;

        if($confirmation == 'start-new-game') {
            $game = Game::create();
            return response()->json(compact('game'), 200);
        } else {
            return response('Confirmation not made', 400);
        }
    }
}
