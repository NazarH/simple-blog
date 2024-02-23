<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Inertia\Response as InertiaResponse;
use Inertia\Inertia;

class IndexController extends Controller
{
    public function __invoke(): InertiaResponse
    {
        return Inertia::render('Admin/IndexComponent');
    }
}
