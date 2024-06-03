<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\MenuController;
use App\Http\Controllers\ProfileController;
use App\Models\Admin;
use App\Models\Menu;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Cache;
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

//logout
Route::post('/logout', [App\Http\Controllers\Auth\AuthenticatedSessionController::class, 'destroy'])
    ->name('logout');
    
    //page untuk kasir
    Route::middleware('auth')->group(function () {
        // Halaman untuk kasir
        Route::get('/kasir', [MenuController::class, 'index']);
        Route::post('/kasirstore', [MenuController::class, 'store']);
        Route::patch('/kasir', [MenuController::class, 'updateUser']);
        Route::post('/kasir/{id}', [MenuController::class, 'edit']);
        Route::post('/kasirstorespontan', [MenuController::class, 'storeSpontan']);
        Route::put('/kasir/{id}', [MenuController::class, 'update']);
    });
  
    //Routes yang bisa diakses hanya oleh admin di masukkan ke sini
    Route::group(['middleware' => ['auth', 'verified', 'admin']], function () {
        // page untuk admin
        Route::get('/admin', [AdminController::class, 'index']);
        Route::post('/admin', [AdminController::class, 'store']);
        Route::post('/adminstore', [AdminController::class, 'create']);
        Route::post('/adminkategori', [AdminController::class, 'createkategori']);
        Route::post('/admintax', [AdminController::class, 'storeTax']);
        Route::post('/admintargetharian', [AdminController::class, 'storeTargetHarian']);
        Route::delete('/admin/{id}', [AdminController::class, 'destroy']);
        Route::put('/admin/{id}', [AdminController::class, 'update']);
        Route::delete('/admindeletemenu/{id}', [AdminController::class, 'destroyMenu']);
        Route::put('/admineditmenu/{id}', [AdminController::class, 'edit']);
        Route::put('/admineditkategori/{id}', [AdminController::class, 'editKategori']);
        Route::delete('/admindeletekategori/{id}', [AdminController::class, 'destroyKategori']);
    });

    
    

require __DIR__.'/auth.php';