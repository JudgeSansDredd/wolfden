<?php

namespace App\Http\Controllers;

use App\Events\WolfAttackEvent;
use App\Utils\GameUtils;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PageController extends Controller
{
    public function dashboard(Request $request) {
        $game = GameUtils::getCurrentGame();
        if(!$game) {
            return "No game in database. Start a new game.";
        }
        return Inertia::render('Dashboard', ['roundNumber' => 1]);
    }

    public function controlPanel(Request $request) {
        return Inertia::render('ControlPanel', ['roundNumber' => 1]);
    }

    public function startNewGame(Request $request) {
        return Inertia::render('NewGame', []);
    }
}
