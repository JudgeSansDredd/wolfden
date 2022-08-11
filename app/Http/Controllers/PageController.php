<?php

namespace App\Http\Controllers;

use App\Events\WolfAttackEvent;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PageController extends Controller
{
    public function dashboard(Request $request) {
        return Inertia::render('Dashboard', ['roundNumber' => 1]);
    }

    public function controlPanel(Request $request) {
        return Inertia::render('ControlPanel', ['roundNumber' => 1]);
    }

}
