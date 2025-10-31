<?php

namespace App\Http\Controllers\Public;

use App\Contract\Master\VideoContract;
use App\Http\Controllers\Controller;

class PublicVideoController extends Controller
{

    protected VideoContract $service;

    public function __construct(VideoContract $service)
    {
        $this->service = $service;
    }

    public function index()
    {
        return view('public.videos.index');
    }

    public function show($id)
    {
        return view('public.videos.show', [
            'video' => Video::find($id)
        ]);
    }
}
