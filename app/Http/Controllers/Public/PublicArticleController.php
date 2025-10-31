<?php

namespace App\Http\Controllers\Public;

use App\Contract\Master\ArticleContract;
use App\Http\Controllers\Controller;

class PublicArticleController extends Controller
{

    protected ArticleContract $service;

    public function __construct(ArticleContract $service)
    {
        $this->service = $service;
    }

    public function index()
    {
        return view('public.articles.index');
    }

    public function show($id)
    {
        return view('public.articles.show', [
            'article' => Article::find($id)
        ]);
    }
}
