<?php

namespace App\Http\Controllers\Master;

use App\Contract\Master\VideoContract;
use App\Http\Controllers\Controller;
use App\Http\Requests\VideoRequest;
use App\Utils\WebResponse;
use Inertia\Inertia;

class VideoController extends Controller
{

    protected VideoContract $service;

    public function __construct(VideoContract $service)
    {
        $this->service = $service;
    }

    public function index()
    {
        return Inertia::render('master/video/index');
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
        return Inertia::render('master/video/form', [
            "props" => $data,
        ]);
    }

    public function create()
    {
        return Inertia::render('master/video/form');
    }

    public function store(VideoRequest $request)
    {
        $payload = $request->validated();
        unset($payload['thumbnail']);
        unset($payload['video']);
        $result = $this->service->create($payload);
        return WebResponse::response($result, 'master.video.index');
    }

    public function update(VideoRequest $request, $id)
    {
        $payload = $request->validated();
        unset($payload['thumbnail']);
        unset($payload['video']);
        $result = $this->service->update(
            [
                ['id', '=', $id]
            ],
            $payload
        );
        return WebResponse::response($result, 'master.video.index');
    }

    public function destroy($id)
    {
        $result = $this->service->destroy($id);
        return WebResponse::response($result, 'master.video.index');
    }
}
