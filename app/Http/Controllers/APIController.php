<?php

namespace App\Http\Controllers;

use App\Events\GameEvent;
use App\Events\RoundEvent;
use App\Events\WolfAttackEvent;
use App\Models\Game;
use App\Models\Round;
use App\Models\User;
use App\Utils\GameUtils;
use Carbon\Carbon;
use Illuminate\Http\Request;

class APIController extends Controller
{

    public function startNewGame(Request $request) {
        $request->validate([
            'confirmation' => 'required|string'
        ]);

        $confirmation = $request->confirmation;

        if($confirmation == 'start-new-game') {
            $user = User::find(auth()->user()->id);
            $game = $user->games()->create([]);
            GameEvent::dispatch($game);
            return redirect()->route('control-panel');
        } else {
            return response('Confirmation not made', 400);
        }
    }

    public function startNewRound(Request $request) {
        $ACTION_TIME=22;
        $TEAM_TIME=8;

        extract(GameUtils::getCurrentAll());
        if(empty($game)) {
            return response("No game to start round in ", 400);
        }
        if(!empty($round) && !$round->resolved) {
            return response("Round $round->round_number in progress", 400);
        }

        $now = Carbon::now();
        $action_time_ends_at = $now->clone()->addMinutes($ACTION_TIME);
        $team_time_ends_at = $action_time_ends_at->clone()->addMinutes($TEAM_TIME);
        $round_number = empty($round) ? 1 : $round->round_number + 1;

        $round = $game->rounds()->create(compact('round_number', 'action_time_ends_at', 'team_time_ends_at'));
        RoundEvent::dispatch($round);
    }

    public function wolfAttack(Request $request) {
        $request->validate([
            'attacking' => 'required|boolean'
        ]);
        $attacking = $request->attacking;
        extract(GameUtils::getCurrentAll());

        // Are we ready for an attack?
        if(empty($game) || empty($round)) {
            return response("Not prepared for Wolf Attack", 400);
        }

        if(empty($attack)) { // No attack exists
            if($attacking) { // Front end says we're attacking
                // Create new attack
                $attack = $round->wolfAttacks()->create([]);
            } else { // Front end says we're not attacking
                return response("Halt attack when no attack exists", 400);
            }
        } else { // An attack exists
            if($attack->resolved) { // Attack is over
                if($attacking) { // Front end says Attacking
                    // Create new attack
                    $attack = $round->wolfAttacks()->create([]);
                } else { // Front end says not attacking
                    return response("Halt a resolved attack", 400);
                }
            } else { // Attack is underway
                if($attacking) { // Attacking
                    return response("Begin an already underway attack", 400);
                } else { // Front end says not attacking
                    // Resolve attack
                    $attack->resolved_at = Carbon::now();
                    $attack->save();
                }
            }
        }
        if(!empty($attack)) {
            WolfAttackEvent::dispatch($attack);
        }
    }

}
