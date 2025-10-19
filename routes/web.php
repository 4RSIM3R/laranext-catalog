<?php

use App\Http\Controllers\HomeController;
use Illuminate\Support\Facades\Route;

Route::get('', [HomeController::class, 'index'])->name('home');

Route::group(['as' => 'public.'], function () {
    Route::group(['prefix' => 'post', 'as' => 'post.'], function () {});
    Route::group(['prefix' => 'video', 'as' => 'video.'], function () {});
    Route::group(['prefix' => 'event', 'as' => 'event.'], function () {});
    Route::group(['prefix' => 'product', 'as' => 'product.'], function () {});
});
