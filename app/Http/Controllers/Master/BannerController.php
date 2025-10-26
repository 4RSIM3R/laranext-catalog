<?php

namespace App\Http\Controllers\Master;

use App\Contract\Master\BannerContract;
use App\Http\Controllers\Controller;
use App\Http\Requests\BannerRequest;
use Inertia\Inertia;
use App\Utils\WebResponse;

class BannerController extends Controller
{

    protected BannerContract $service;

    public function __construct(BannerContract $service)
    {
        $this->service = $service;
    }

    public function index()
    {
        return Inertia::render('master/banner/index');
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
        return Inertia::render('master/banner/form', [
            "user" => $data,
        ]);
    }

    public function create()
    {
        return Inertia::render('master/banner/form');
    }

    public function store(BannerRequest $request)
    {
        $payload = $request->validated();
        unset($payload['thumbnail']);
        $result = $this->service->create($payload);
        return WebResponse::response($result, 'master.banner.index');
    }

    public function update(BannerRequest $request, $id)
    {
        $payload = $request->validated();
        unset($payload['thumbnail']);
        $result = $this->service->update(
            [
                ['id', '=', $id]
            ],
            $payload
        );
        return WebResponse::response($result, 'master.banner.index');
    }

    public function destroy($id)
    {
        $result = $this->service->destroy($id);
        return WebResponse::response($result, 'master.banner.index');
    }
}
