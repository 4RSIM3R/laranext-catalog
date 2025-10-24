<?php

namespace App\Http\Controllers\Master;

use App\Contract\Master\PostContract;
use App\Http\Controllers\Controller;
use App\Http\Requests\PostRequest;
use App\Utils\WebResponse;
use Inertia\Inertia;

class PostController extends Controller
{

    protected PostContract $service;

    public function __construct(PostContract $service)
    {
        $this->service = $service;
    }

    public function index()
    {
        return Inertia::render('master/post/index');
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
        return Inertia::render('master/post/form', [
            "user" => $data,
        ]);
    }

    public function create()
    {
        return Inertia::render('master/post/form');
    }

    public function store(PostRequest $request)
    {
        $payload = $request->validated();

        $result = $this->service->create($payload);
        return WebResponse::response($result, 'master.post.index');
    }

    public function update(PostRequest $request, $id)
    {
        $payload = $request->validated();

        $result = $this->service->update(
            [
                ['id', '=', $id]
            ],
            $payload
        );
        return WebResponse::response($result, 'master.post.index');
    }

    public function destroy($id)
    {
        $result = $this->service->destroy($id);
        return WebResponse::response($result, 'master.post.index');
    }
}
