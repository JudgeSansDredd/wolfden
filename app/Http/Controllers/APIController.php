<?php

namespace App\Http\Controllers;

use App\Events\WolfAttackEvent;
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
}
