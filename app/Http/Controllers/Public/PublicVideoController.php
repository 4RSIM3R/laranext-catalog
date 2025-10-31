<?php

namespace App\Http\Controllers\Public;

use App\Contract\Master\VideoContract;
use App\Http\Controllers\Controller;
use Inertia\Inertia;

class PublicVideoController extends Controller
{

    protected VideoContract $service;

    public function __construct(VideoContract $service)
    {
        $this->service = $service;
    }

    public function index()
    {
        $data = $this->service->all(
            filters: ['title'],
            sorts: ['title', 'created_at'],
            paginate: true,
            per_page: request()->get('per_page') ?? 12,
            order_column: 'created_at',
            order_position: 'desc',
            conditions: [],
            relation: []
        );

        return Inertia::render('video/index', [
            'props' => $data,
        ]);
    }

    public function show($id)
    {
        $video = $this->service->find($id, []);

        // Get related videos (same category or recent videos, excluding current)
        $related = $this->service->all(
            filters: [],
            sorts: ['created_at'],
            paginate: false,
            per_page: 8,
            order_column: 'created_at',
            order_position: 'desc',
            conditions: [
                ['id', '!=', $id]
            ],
            relation: []
        );

        // Limit to 8 related videos
        $relatedVideos = collect($related)->take(8);

        return Inertia::render('video/detail', [
            'props' => [
                'video' => $video,
                'related' => $relatedVideos,
            ],
        ]);
    }
}
