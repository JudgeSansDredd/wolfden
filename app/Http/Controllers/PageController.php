<?php

namespace App\Http\Controllers;

use App\Events\WolfAttackEvent;
use App\Utils\GameUtils;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class PageController extends Controller
{
    public function dashboard(Request $request) {
        $all = GameUtils::getCurrentAll();
        return Inertia::render('Dashboard', $all);
    }

    public function controlPanel(Request $request) {
        $all = GameUtils::getCurrentAll();
        if(empty($all['game'])) {
            return redirect()->route('get-start-new-game');
        }
        return Inertia::render('ControlPanel', GameUtils::getCurrentAll());
    }

    public function startNewGame(Request $request) {
        return Inertia::render('NewGame', []);
    }
}
