<?php

use App\Http\Controllers\Auth\UserAuthController;
use Illuminate\Support\Facades\Route;

Route::group(['prefix' => 'auth'], function () {
    Route::get('login', [UserAuthController::class, 'login'])->name('login');
    Route::post('login', [UserAuthController::class, 'attempt'])->name('attempt');

    Route::group(['middleware' => 'auth'], function () {
        Route::post('logout', [UserAuthController::class, 'logout'])->name('logout');
    });
});
