<?php

namespace App\Http\Controllers\Master;

use App\Contract\Master\FileContract;
use App\Http\Controllers\Controller;
use App\Http\Requests\FileRequest;
use App\Utils\WebResponse;
use Inertia\Inertia;

class FileController extends Controller
{

    protected FileContract $service;

    public function __construct(FileContract $service)
    {
        $this->service = $service;
    }

    public function index()
    {
        return Inertia::render('master/file/index');
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
        return Inertia::render('master/file/form', [
            "user" => $data,
        ]);
    }

    public function create()
    {
        return Inertia::render('master/file/form');
    }

    public function store(FileRequest $request)
    {
        $payload = $request->validated();

        $result = $this->service->create($payload);
        return WebResponse::response($result, 'master.file.index');
    }

    public function update(FileRequest $request, $id)
    {
        $payload = $request->validated();

        $result = $this->service->update(
            [
                ['id', '=', $id]
            ],
            $payload
        );
        return WebResponse::response($result, 'master.file.index');
    }

    public function destroy($id)
    {
        $result = $this->service->destroy($id);
        return WebResponse::response($result, 'master.file.index');
    }
}
