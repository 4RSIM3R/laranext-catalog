<?php

namespace App\Http\Controllers\Master;

use App\Contract\Master\ProductContract;
use App\Http\Controllers\Controller;
use App\Http\Requests\ProductRequest;
use App\Utils\WebResponse;
use Inertia\Inertia;

class ProductController extends Controller
{

    protected ProductContract $service;

    public function __construct(ProductContract $service)
    {
        $this->service = $service;
    }

    public function index()
    {
        return Inertia::render('master/product/index');
    }

    public function fetch()
    {
        $data = $this->service->all(
            filters: ['name'],
            sorts: ['name', 'created_at'],
            paginate: true,
            per_page: request()->get('per_page') ?? 10,
            conditions: [],
            relation: ['category']
        );

        return response()->json($data);
    }

    public function show($id)
    {
        $data = $this->service->find($id, ['category']);
        return Inertia::render('master/product/form', [
            "user" => $data,
        ]);
    }

    public function create()
    {
        return Inertia::render('master/product/form');
    }

    public function store(ProductRequest $request)
    {
        $payload = $request->validated();
        unset($payload['thumbnail']);
        $result = $this->service->create($payload);
        return WebResponse::response($result, 'master.product.index');
    }

    public function update(ProductRequest $request, $id)
    {
        $payload = $request->validated();
        unset($payload['thumbnail']);
        $result = $this->service->update(
            [
                ['id', '=', $id]
            ],
            $payload
        );
        return WebResponse::response($result, 'master.product.index');
    }

    public function destroy($id)
    {
        $result = $this->service->destroy($id);
        return WebResponse::response($result, 'master.product.index');
    }
}
