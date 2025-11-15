<?php

namespace App\Http\Controllers\Master;

use App\Contract\Master\CategoryContract;
use App\Http\Controllers\Controller;
use App\Http\Requests\CategoryRequest;
use App\Utils\WebResponse;
use Inertia\Inertia;
use Spatie\QueryBuilder\AllowedFilter;

class CategoryController extends Controller
{

    protected CategoryContract $service;

    public function __construct(CategoryContract $service)
    {
        $this->service = $service;
    }

    public function index()
    {
        return Inertia::render('master/category/index');
    }

    public function fetch()
    {
        $data = $this->service->all(
            filters: ['name', AllowedFilter::exact('type')],
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
        return Inertia::render('master/category/form', [
            "props" => $data,
        ]);
    }

    public function create()
    {
        return Inertia::render('master/category/form');
    }

    public function store(CategoryRequest $request)
    {
        $payload = $request->validated();

        $result = $this->service->create($payload);
        return WebResponse::response($result, 'master.category.index');
    }

    public function update(CategoryRequest $request, $id)
    {
        $payload = $request->validated();

        $result = $this->service->update(
            [
                ['id', '=', $id]
            ],
            $payload
        );
        return WebResponse::response($result, 'master.category.index');
    }

    public function destroy($id)
    {
        $result = $this->service->destroy($id);
        return WebResponse::response($result, 'master.category.index');
    }
}
