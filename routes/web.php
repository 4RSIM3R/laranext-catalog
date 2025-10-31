<?php

use App\Http\Controllers\HomeController;
use App\Http\Controllers\Public\PublicArticleController;
use App\Http\Controllers\Public\PublicEventController;
use App\Http\Controllers\Public\PublicProductController;
use App\Http\Controllers\Public\PublicVideoController;
use Illuminate\Support\Facades\Route;

Route::get('', [HomeController::class, 'index'])->name('home');
Route::get('partnership', [HomeController::class, 'partnership'])->name('partnership');

Route::group(['as' => 'public.'], function () {
    Route::group(['prefix' => 'article', 'as' => 'article.'], function () {
        Route::get('', [PublicArticleController::class, 'index'])->name('index');
        Route::get('{id}', [PublicArticleController::class, 'show'])->name('show');
    });
    Route::group(['prefix' => 'video', 'as' => 'video.'], function () {
        Route::get('', [PublicVideoController::class, 'index'])->name('index');
        Route::get('{id}', [PublicVideoController::class, 'show'])->name('show');
    });
    Route::group(['prefix' => 'event', 'as' => 'event.'], function () {
        Route::get('', [PublicEventController::class, 'index'])->name('index');
        Route::get('{id}', [PublicEventController::class, 'show'])->name('show');
    });
    Route::group(['prefix' => 'product', 'as' => 'product.'], function () {
        Route::get('', [PublicProductController::class, 'index'])->name('index');
        Route::get('{id}', [PublicProductController::class, 'show'])->name('show');
    });
});
