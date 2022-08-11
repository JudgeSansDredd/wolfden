<?php

use App\Http\Controllers\PageController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

// Route::get('/login', function() {
//     return "This is a login page";
// })->name('login');

Route::get('/', [PageController::class, 'dashboard'])->name('dashboard');

Route::middleware('auth')->group(function() {
    Route::get('/controlpanel', [PageController::class, 'controlPanel'])->name('controlPanel');
});

require __DIR__.'/auth.php';
