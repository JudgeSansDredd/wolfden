<?php

namespace App\Http\Controllers;

use App\Events\WolfAttackEvent;
use App\Models\Game;
use App\Models\Round;
use App\Utils\GameUtils;
use Illuminate\Http\Request;

class APIController extends Controller
{
    public function wolfAttack(Request $request) {
        $request->validate([
            'attacking' => 'required|boolean'
        ]);
        $attacking = $request->attacking;
        extract(GameUtils::getCurrentAll());
        if(!empty($attack) && !$attack->resolved && !$attacking) {
            // Update attack with resolved
            $attack->resolved = true;
            $attack->save();
        } elseif($attacking && (empty($attack) || $attack->resolved)) {
            // Create new attack
            $attack = $round->wolfAttacks()->create([]);
        }

        if($attack) {
            WolfAttackEvent::dispatch($attack);
            return response()->json(compact('attack'), 200);
        } else {
            return response("Invalid command", 400);
        }
    }

    public function startNewGame(Request $request) {
        $request->validate([
            'confirmation' => 'required|string'
        ]);

        $confirmation = $request->confirmation;

        if($confirmation == 'start-new-game') {
            $game = Game::create();
            return redirect()->route('control-panel');
        } else {
            return response('Confirmation not made', 400);
        }
    }
}
