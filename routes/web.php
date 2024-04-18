<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\MenuController;
use App\Http\Controllers\ProfileController;
use App\Models\Menu;
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

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

    Route::middleware('auth')->group(function () {
        Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
        Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
        Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    });

    // //page untuk kasir
    // Route::middleware('auth')->group(function () {
        // Halaman untuk kasir
        Route::get('/kasir', [MenuController::class, 'index']);
    // });
  
    //Routes yang bisa diakses hanya oleh admin di masukkan ke sini
    // Route::group(['middleware' => ['auth', 'verified', 'admin']], function () {
        //page untuk admin
        Route::get('/admin', [AdminController::class, 'index']);

    // });
    
    

require __DIR__.'/auth.php';