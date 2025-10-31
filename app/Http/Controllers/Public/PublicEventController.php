<?php

namespace App\Http\Controllers\Public;

use App\Contract\Master\EventContract;
use App\Http\Controllers\Controller;

class PublicEventController extends Controller
{

    protected EventContract $service;

    public function __construct(EventContract $service)
    {
        $this->service = $service;
    }

    public function index()
    {
        return view('public.events.index');
    }

    public function show($id)
    {
        return view('public.events.show', [
            'event' => Event::find($id)
        ]);
    }
}
