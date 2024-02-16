<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\TagController;
use App\Http\Controllers\Api\MainController;
use App\Http\Controllers\Api\UsersController;
use App\Http\Controllers\Api\RubricsController;
use App\Http\Controllers\Api\ArticlesController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/
Route::get('/user', function (Request $request) {
    dd($request);
    return $request->user();
});

//Route::middleware('auth:api')->get('/auth', [UsersController::class, 'auth']);

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
