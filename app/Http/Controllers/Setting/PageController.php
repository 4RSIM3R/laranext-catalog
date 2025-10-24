<?php

namespace App\Http\Controllers\Setting;

use App\Contract\Setting\PageContract;
use App\Http\Controllers\Controller;
use App\Http\Requests\PageRequest;
use App\Models\Page;
use App\Utils\WebResponse;
use Inertia\Inertia;

class PageController extends Controller
{

    protected PageContract $service;

    public function __construct(PageContract $service)
    {
        $this->service = $service;
    }

    public function index()
    {
        return Inertia::render('setting/page/index');
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
        return Inertia::render('setting/page/form', [
            "user" => $data,
        ]);
    }

    public function create()
    {
        return Inertia::render('setting/page/form');
    }

    public function store(PageRequest $request)
    {
        $payload = $request->validated();

        $result = $this->service->create($payload);
        return WebResponse::response($result, 'setting.page.index');
    }

    public function update(PageRequest $request, $id)
    {
        $payload = $request->validated();

        $result = $this->service->update(
            [
                ['id', '=', $id]
            ],
            $payload
        );
        return WebResponse::response($result, 'setting.page.index');
    }

    public function destroy($id)
    {
        $result = $this->service->destroy($id);
        return WebResponse::response($result, 'setting.page.index');
    }
}
