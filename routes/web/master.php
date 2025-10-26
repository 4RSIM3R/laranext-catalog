<?php

use App\Http\Controllers\Master\BannerController;
use App\Http\Controllers\Master\CategoryController;
use App\Http\Controllers\Master\EventController;
use App\Http\Controllers\Master\FileController;
use App\Http\Controllers\Master\PostController;
use App\Http\Controllers\Master\ProductController;
use App\Http\Controllers\Master\UserController;
use App\Http\Controllers\Master\VideoController;
use Illuminate\Support\Facades\Route;

Route::group(['prefix' => 'backoffice/master', 'as' => 'master.'], function () {
    Route::group(['prefix' => 'user', 'as' => 'user.'], function () {
        Route::get('', [UserController::class, 'index'])->name('index');
        Route::get('fetch', [UserController::class, 'fetch'])->name('fetch');
        Route::get('create', [UserController::class, 'create'])->name('create');
        Route::post('store', [UserController::class, 'store'])->name('store');
        Route::get('{id}', [UserController::class, 'show'])->name('show');
        Route::put('{id}', [UserController::class, 'update'])->name('update');
        Route::delete('{id}', [UserController::class, 'destroy'])->name('destroy');
    });

    Route::group(['prefix' => 'banner', 'as' => 'banner.'], function () {
        Route::get('', [BannerController::class, 'index'])->name('index');
        Route::get('fetch', [BannerController::class, 'fetch'])->name('fetch');
        Route::get('create', [BannerController::class, 'create'])->name('create');
        Route::post('store', [BannerController::class, 'store'])->name('store');
        Route::get('{id}', [BannerController::class, 'show'])->name('show');
        Route::post('{id}', [BannerController::class, 'update'])->name('update');
        Route::delete('{id}', [BannerController::class, 'destroy'])->name('destroy');
    });

    Route::group(['prefix' => 'category', 'as' => 'category.'], function () {
        Route::get('', [CategoryController::class, 'index'])->name('index');
        Route::get('fetch', [CategoryController::class, 'fetch'])->name('fetch');
        Route::get('create', [CategoryController::class, 'create'])->name('create');
        Route::post('store', [CategoryController::class, 'store'])->name('store');
        Route::get('{id}', [CategoryController::class, 'show'])->name('show');
        Route::put('{id}', [CategoryController::class, 'update'])->name('update');
        Route::delete('{id}', [CategoryController::class, 'destroy'])->name('destroy');
    });

    Route::group(['prefix' => 'event', 'as' => 'event.'], function () {
        Route::get('', [EventController::class, 'index'])->name('index');
        Route::get('fetch', [EventController::class, 'fetch'])->name('fetch');
        Route::get('create', [EventController::class, 'create'])->name('create');
        Route::post('store', [EventController::class, 'store'])->name('store');
        Route::get('{id}', [EventController::class, 'show'])->name('show');
        Route::put('{id}', [EventController::class, 'update'])->name('update');
        Route::delete('{id}', [EventController::class, 'destroy'])->name('destroy');
    });

    Route::group(['prefix' => 'file', 'as' => 'file.'], function () {
        Route::get('', [FileController::class, 'index'])->name('index');
        Route::get('fetch', [FileController::class, 'fetch'])->name('fetch');
        Route::get('create', [FileController::class, 'create'])->name('create');
        Route::post('store', [FileController::class, 'store'])->name('store');
        Route::get('{id}', [FileController::class, 'show'])->name('show');
        Route::put('{id}', [FileController::class, 'update'])->name('update');
        Route::delete('{id}', [FileController::class, 'destroy'])->name('destroy');
    });

    Route::group(['prefix' => 'post', 'as' => 'post.'], function () {
        Route::get('', [PostController::class, 'index'])->name('index');
        Route::get('fetch', [PostController::class, 'fetch'])->name('fetch');
        Route::get('create', [PostController::class, 'create'])->name('create');
        Route::post('store', [PostController::class, 'store'])->name('store');
        Route::get('{id}', [PostController::class, 'show'])->name('show');
        Route::put('{id}', [PostController::class, 'update'])->name('update');
        Route::delete('{id}', [PostController::class, 'destroy'])->name('destroy');
    });

    Route::group(['prefix' => 'product', 'as' => 'product.'], function () {
        Route::get('', [ProductController::class, 'index'])->name('index');
        Route::get('fetch', [ProductController::class, 'fetch'])->name('fetch');
        Route::get('create', [ProductController::class, 'create'])->name('create');
        Route::post('store', [ProductController::class, 'store'])->name('store');
        Route::get('{id}', [ProductController::class, 'show'])->name('show');
        Route::put('{id}', [ProductController::class, 'update'])->name('update');
        Route::delete('{id}', [ProductController::class, 'destroy'])->name('destroy');
    });

    Route::group(['prefix' => 'video', 'as' => 'video.'], function () {
        Route::get('', [VideoController::class, 'index'])->name('index');
        Route::get('fetch', [VideoController::class, 'fetch'])->name('fetch');
        Route::get('create', [VideoController::class, 'create'])->name('create');
        Route::post('store', [VideoController::class, 'store'])->name('store');
        Route::get('{id}', [VideoController::class, 'show'])->name('show');
        Route::put('{id}', [VideoController::class, 'update'])->name('update');
        Route::delete('{id}', [VideoController::class, 'destroy'])->name('destroy');
    });
});
