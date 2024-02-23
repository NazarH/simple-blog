<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\TagController;
use App\Http\Controllers\Api\MainController;
use App\Http\Controllers\Api\UsersController;
use App\Http\Controllers\Api\RubricsController;
use App\Http\Controllers\Api\ArticlesController;

Route::get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/tags/index')
        ->uses([TagController::class, 'index']);
Route::get('/select/tags')
        ->uses([TagController::class, 'search']);

Route::get('/rubrics/index')
        ->uses([RubricsController::class, 'index']);
Route::get('/select/rubrics')
        ->uses([RubricsController::class, 'search']);

Route::get('/users/index')
        ->uses([UsersController::class, 'index']);
Route::get('/auth')
        ->uses([UsersController::class, 'auth']);

Route::get('/articles/index')
        ->uses([ArticlesController::class, 'index']);
Route::get('/articles/edit/{id}')
        ->uses([ArticlesController::class, 'edit']);

Route::get('/admin/info')
        ->uses([MainController::class, 'index']);

Route::delete('/admin/tags/delete/{id}', 'TagController@delete');
