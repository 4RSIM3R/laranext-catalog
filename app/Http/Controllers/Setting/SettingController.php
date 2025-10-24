<?php

namespace App\Http\Controllers\Setting;

use App\Contract\Setting\SettingContract;
use App\Http\Controllers\Controller;
use App\Http\Requests\SettingRequest;
use Inertia\Inertia;
use App\Utils\WebResponse;

class SettingController extends Controller
{

    protected SettingContract $service;

    public function __construct(SettingContract $service)
    {
        $this->service = $service;
    }

    public function index()
    {
        return Inertia::render('setting/setting/index');
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
        return Inertia::render('setting/setting/form', [
            "user" => $data,
        ]);
    }

    public function create()
    {
        return Inertia::render('setting/setting/form');
    }

    public function store(SettingRequest $request)
    {
        $payload = $request->validated();

        $result = $this->service->create($payload);
        return WebResponse::response($result, 'setting.setting.index');
    }

    public function update(SettingRequest $request, $id)
    {
        $payload = $request->validated();

        $result = $this->service->update(
            [
                ['id', '=', $id]
            ],
            $payload
        );
        return WebResponse::response($result, 'setting.setting.index');
    }

    public function destroy($id)
    {
        $result = $this->service->destroy($id);
        return WebResponse::response($result, 'setting.setting.index');
    }
}
