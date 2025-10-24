<?php

namespace App\Http\Controllers\Master;

use App\Contract\Master\EventContract;
use App\Http\Controllers\Controller;
use App\Http\Requests\EventRequest;
use App\Utils\WebResponse;
use Inertia\Inertia;

class EventController extends Controller
{

    protected EventContract $service;

    public function __construct(EventContract $service)
    {
        $this->service = $service;
    }

    public function index()
    {
        return Inertia::render('master/event/index');
    }

    public function fetch()
    {
        $data = $this->service->all(
            filters: ['name'],
            sorts: ['name', 'created_at'],
            paginate: true,
            per_page: request()->get('per_page') ?? 10,
            conditions: [],
            relation: []
        );

        return response()->json($data);
    }

    public function show($id)
    {
        $data = $this->service->find($id, []);
        return Inertia::render('master/event/form', [
            "user" => $data,
        ]);
    }

    public function create()
    {
        return Inertia::render('master/event/form');
    }

    public function store(EventRequest $request)
    {
        $payload = $request->validated();

        $result = $this->service->create($payload);
        return WebResponse::response($result, 'master.event.index');
    }

    public function update(EventRequest $request, $id)
    {
        $payload = $request->validated();

        $result = $this->service->update(
            [
                ['id', '=', $id]
            ],
            $payload
        );
        return WebResponse::response($result, 'master.event.index');
    }

    public function destroy($id)
    {
        $result = $this->service->destroy($id);
        return WebResponse::response($result, 'master.event.index');
    }
}
