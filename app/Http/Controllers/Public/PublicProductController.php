<?php

namespace App\Http\Controllers\Public;

use App\Contract\Master\ProductContract;
use App\Http\Controllers\Controller;

class PublicProductController extends Controller
{

    protected ProductContract $service;

    public function __construct(ProductContract $service)
    {
        $this->service = $service;
    }

    public function index()
    {
        return view('public.products.index');
    }

    public function show($id)
    {
        return view('public.products.show', [
            'product' => Product::find($id)
        ]);
    }
}
