<?php

namespace App\Http\Controllers\Public;

use App\Contract\Master\ArticleContract;
use App\Http\Controllers\Controller;
use Inertia\Inertia;

class PublicArticleController extends Controller
{

    protected ArticleContract $service;

    public function __construct(ArticleContract $service)
    {
        $this->service = $service;
    }

    public function index()
    {
        $data = $this->service->all(
            filters: ['title', 'excerpt'],
            sorts: ['title', 'created_at'],
            paginate: true,
            per_page: request()->get('per_page') ?? 12,
            order_column: 'created_at',
            order_position: 'desc',
            conditions: [],
            relation: ['category']
        );

        return Inertia::render('article/index', [
            'props' => $data,
        ]);
    }

    public function show($id)
    {
        $article = $this->service->find($id, ['category']);

        // Get related articles (same category or recent articles, excluding current)
        $related = $this->service->all(
            filters: [],
            sorts: ['created_at'],
            paginate: false,
            per_page: 6,
            order_column: 'created_at',
            order_position: 'desc',
            conditions: [
                ['id', '!=', $id]
            ],
            relation: ['category']
        );

        // Limit to 6 related articles
        $relatedArticles = collect($related)->take(6);

        return Inertia::render('article/detail', [
            'props' => [
                'article' => $article,
                'related' => $relatedArticles,
            ],
        ]);
    }
}
