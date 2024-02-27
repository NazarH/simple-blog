<?php

use Illuminate\Support\Facades\Route;

use App\Http\Controllers\Auth\ForgotPasswordController;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Auth\ResetPasswordController;
use App\Http\Controllers\Front\ArticleController;
use App\Http\Controllers\Front\HomeController;
use App\Http\Controllers\Front\ProfileController;
use App\Http\Controllers\Front\RubricController;
use App\Http\Controllers\Front\TagController;

use App\Models\Rubric;
use App\Models\Tag;
use App\Models\User;

require(base_path('routes/admin/web.php'));

Auth::routes(['register' => false]);

Route::bind('rubricId', fn (string $rubricId) => Rubric::query()
    ->active()
    ->findOrFail($rubricId)
);

Route::bind('tagId', fn (string $tagId) => Tag::query()
    ->active()
    ->findOrFail($tagId)
);

Route::bind('userId', fn (string $userId) => User::query()
    ->findOrFail($userId)
);

Route::group(['prefix' => '/'], function(){
    Route::get('')
        ->uses([HomeController::class, 'index'])
        ->name('pages.home');
    Route::group(['prefix' => '/article'], function(){
        Route::get('/{article}')
            ->uses([ArticleController::class, 'index'])
            ->name('pages.article');
    });

    Route::get('/rubric/{rubricId}')
        ->uses([RubricController::class, 'index'])
        ->name('pages.rubric');
    Route::get('/tags/{tagId}')
        ->uses([TagController::class, 'index'])
        ->name('pages.tag');

    Route::get('/search')
        ->uses([HomeController::class, 'search'])
        ->name('pages.search');

    Route::group(['prefix' => '/profile'], function(){
        Route::get('/')
            ->uses([ProfileController::class, 'index'])
            ->name('pages.profile');

        Route::post('/edit/{userId}')
            ->uses([ProfileController::class, 'update'])
            ->name('pages.profile.edit');
    });

    Route::get('/login')
        ->uses([LoginController::class, 'index'])
        ->name('auth.index');

    Route::group(['prefix' => '/forgot-password'], function(){
        Route::get('/')
            ->uses([ForgotPasswordController::class, 'index'])
            ->name('password.index');
        Route::post('/')
            ->uses([ForgotPasswordController::class, 'store'])
            ->name('password.request');
    });

    Route::group(['prefix' => '/reset-password'], function(){
        Route::get('/')
            ->uses([ResetPasswordController::class, 'index'])
            ->name('password.reset');
        Route::post('/')
            ->uses([ResetPasswordController::class, 'update'])
            ->name('password.update');
    });
});

