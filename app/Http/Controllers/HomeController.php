<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Inertia\Inertia;

class HomeController extends Controller
{

    public function index()
    {
        return Inertia::render('home');
    }

    public function partnership()
    {
        return Inertia::render('partnership');
    }

    public function about()
    {
        return Inertia::render('about');
    }

    public function privacy_policy()
    {
        return Inertia::render('privacy-policy');
    }
}
