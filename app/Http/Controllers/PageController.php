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
        $all = GameUtils::getCurrentAll();
        $all['qr'] = QrCode::size(100)
            // ->eyeColor(0, 0, 0, 0, 255, 0, 0)
            // ->eyeColor(1, 0, 0, 0, 255, 0, 0)
            ->gradient(255, 0, 0, 0, 0, 0, 'radial')
            ->generate($request->fullUrlWithQuery(['room_code' => 'abcdefg']))
            ->toHtml();
        Log::debug($all);
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
