<?php

namespace App\Http\Controllers;

use App\Utils\GameUtils;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
use SimpleSoftwareIO\QrCode\Facades\QrCode;

class PageController extends Controller
{
    public function dashboard(Request $request) {
        $room_code = $request->get('room_code');
        if(empty($room_code)) {
            return "You'll need a room code";
        }
        extract(GameUtils::getCurrentAll($room_code));
        $qr = empty($game) ? null : QrCode::size(100)
            // ->eyeColor(0, 0, 0, 0, 255, 0, 0)
            // ->eyeColor(1, 0, 0, 0, 255, 0, 0)
            ->gradient(255, 0, 0, 0, 0, 0, 'radial')
            ->generate($request->fullUrlWithQuery(['room_code' => $game['room_code']]))
            ->toHtml();
        return Inertia::render('Dashboard', compact('game', 'round', 'attack', 'qr'));
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
