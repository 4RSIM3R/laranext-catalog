<?php

use App\Http\Controllers\Setting\PageController;
use App\Http\Controllers\Setting\SettingController;
use Illuminate\Support\Facades\Route;

Route::group(['prefix' => 'backoffice/setting', 'as' => 'setting.', 'middleware' => ['auth']], function () {
    Route::group(['prefix' => 'setting', 'as' => 'system.'], function () {
        Route::get('', [SettingController::class, 'index'])->name('index');
        Route::get('fetch', [SettingController::class, 'fetch'])->name('fetch');
        Route::get('create', [SettingController::class, 'create'])->name('create');
        Route::post('store', [SettingController::class, 'store'])->name('store');
        Route::get('{id}', [SettingController::class, 'show'])->name('show');
        Route::put('{id}', [SettingController::class, 'update'])->name('update');
        Route::delete('{id}', [SettingController::class, 'destroy'])->name('destroy');
    });

    Route::group(['prefix' => 'page', 'as' => 'page.'], function () {
        Route::get('', [PageController::class, 'index'])->name('index');
        Route::get('fetch', [PageController::class, 'fetch'])->name('fetch');
        Route::get('create', [PageController::class, 'create'])->name('create');
        Route::post('store', [PageController::class, 'store'])->name('store');
        Route::get('{id}', [PageController::class, 'show'])->name('show');
        Route::put('{id}', [PageController::class, 'update'])->name('update');
        Route::delete('{id}', [PageController::class, 'destroy'])->name('destroy');
    });
});
