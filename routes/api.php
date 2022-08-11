<?php

use App\Http\Controllers\APIController;
use App\Http\Controllers\PageController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::middleware('auth')->group(function() {
    Route::post('/wa', [APIController::class, 'wolfAttack'])->name('wolf-attack');
    Route::post('/start-new-game', [APIController::class, 'startNewGame'])->name('post-start-new-game');
});

