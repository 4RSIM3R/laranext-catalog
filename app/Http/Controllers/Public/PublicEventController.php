<?php

namespace App\Http\Controllers\Public;

use App\Contract\Master\EventContract;
use App\Http\Controllers\Controller;
use Inertia\Inertia;

class PublicEventController extends Controller
{

    protected EventContract $service;

    public function __construct(EventContract $service)
    {
        $this->service = $service;
    }

    public function index()
    {
        $data = $this->service->all(
            filters: ['title'],
            sorts: ['title', 'date', 'created_at'],
            paginate: true,
            per_page: request()->get('per_page') ?? 12,
            order_column: 'date',
            order_position: 'asc',
            conditions: [],
            relation: []
        );

        return Inertia::render('event/index', [
            'props' => $data,
        ]);
    }

    public function show($id)
    {
        $event = $this->service->find($id, []);

        // Get related events (upcoming events, excluding current)
        $related = $this->service->all(
            filters: [],
            sorts: ['date'],
            paginate: false,
            per_page: 6,
            order_column: 'date',
            order_position: 'asc',
            conditions: [
                ['id', '!=', $id]
            ],
            relation: []
        );

        // Limit to 6 related events
        $relatedEvents = collect($related)->take(6);

        return Inertia::render('event/detail', [
            'props' => [
                'event' => $event,
                'related' => $relatedEvents,
            ],
        ]);
    }
}
