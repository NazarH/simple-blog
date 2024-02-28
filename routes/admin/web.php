<?php

use Illuminate\Support\Facades\Route;

use App\Http\Controllers\Admin\TagsController;
use App\Http\Controllers\Admin\UsersController;
use App\Http\Controllers\Admin\RubricsController;
use App\Http\Controllers\Admin\ArticlesController;

Route::group(['prefix' => 'admin', 'middleware' => 'admin.auth'], function(){
    Route::group(['prefix' => 'tags'], function(){
        Route::post('/update/{tag}')
            ->uses([TagsController::class, 'update'])
            ->name('admin.tags.update');

        Route::post('/edit/{tag}')
            ->uses([TagsController::class, 'edit'])
            ->name('admin.tags.edit');

        Route::post('/store')
            ->uses([TagsController::class, 'store'])
            ->name('admin.tags.store');

        Route::delete('/delete/{tag}')
            ->uses([TagsController::class, 'destroy'])
            ->name('admin.tags.delete');
    });

    Route::group(['prefix' => 'rubrics'], function(){
        Route::post('/update/{rubric}')
            ->uses([RubricsController::class, 'update'])
            ->name('admin.rubrics.update');

        Route::post('/edit/{rubric}')
            ->uses([RubricsController::class, 'edit'])
            ->name('admin.rubrics.edit');

        Route::post('/store')
            ->uses([RubricsController::class, 'store'])
            ->name('admin.rubrics.store');

        Route::delete('/delete/{rubric}')
            ->uses([RubricsController::class, 'destroy'])
            ->name('admin.rubrics.delete');
    });

    Route::group(['prefix' => 'articles'], function(){
        Route::post('/update/{article}')
            ->uses([ArticlesController::class, 'activeUpdate'])
            ->name('admin.articles.update');

        Route::delete('/delete/{article}')
            ->uses([ArticlesController::class, 'destroy'])
            ->name('admin.articles.delete');

        Route::group(['prefix' => 'create'], function(){
            Route::get('/')
                ->uses([ArticlesController::class, 'create'])
                ->name('admin.articles.form');

            Route::post('/store')
                ->uses([ArticlesController::class, 'store'])
                ->name('admin.articles.form.store');
        });
        Route::group(['prefix' => 'edit'], function(){
            Route::post('/{article}/update')
                ->uses([ArticlesController::class, 'update'])
                ->name('admin.articles.form.edit.update');
        });
        Route::post('/upload')
            ->uses([ArticlesController::class, 'upload'])
            ->name('image.upload');
    });

    Route::group(['prefix' => 'users'], function(){
        Route::post('/store')
                ->uses([UsersController::class, 'store'])
                ->name('admin.users.store');
        Route::post('/{user}/ban')
                ->uses([UsersController::class, 'deactivation'])
                ->name('admin.users.ban');
        Route::post('/{user}/unban')
                ->uses([UsersController::class, 'activation'])
                ->name('admin.users.unban');
        Route::post('/{user}/update')
                ->uses([UsersController::class, 'update'])
                ->name('admin.users.update');
    });
});
