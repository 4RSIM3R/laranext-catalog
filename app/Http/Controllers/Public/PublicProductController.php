<?php

namespace App\Http\Controllers\Public;

use App\Contract\Master\ProductContract;
use App\Http\Controllers\Controller;
use App\Models\Category;
use Inertia\Inertia;

class PublicProductController extends Controller
{

    protected ProductContract $service;

    public function __construct(ProductContract $service)
    {
        $this->service = $service;
    }

    public function index()
    {
        $data = $this->service->all(
            filters: ['title', 'excerpt', 'category_id'],
            sorts: ['title', 'created_at'],
            paginate: true,
            per_page: request()->get('per_page') ?? 12,
            order_column: 'created_at',
            order_position: 'desc',
            conditions: [],
            relation: ['category']
        );

        // Get all categories for filter
        $categories = Category::all();

        return Inertia::render('product/index', [
            'props' => $data,
            'categories' => $categories,
        ]);
    }

    public function show($slug)
    {
        $product = $this->service->findWhere(['slug' => $slug], ['category']);

        // Get related products (same category or recent products, excluding current)
        $related = $this->service->all(
            filters: [],
            sorts: ['created_at'],
            paginate: false,
            per_page: 8,
            order_column: 'created_at',
            order_position: 'desc',
            conditions: [
                ['id', '!=', $product->id]
            ],
            relation: ['category']
        );

        // Limit to 8 related products
        $relatedProducts = collect($related)->take(8);

        return Inertia::render('product/detail', [
            'props' => [
                'product' => $product,
                'related' => $relatedProducts,
            ],
        ]);
    }
}
