<?php

namespace App\Http\Controllers\Master;

use App\Contract\Master\PartnerContract;
use App\Http\Controllers\Controller;
use App\Http\Requests\PartnerRequest;
use App\Utils\WebResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PartnerController extends Controller
{

    protected PartnerContract $service;

    public function __construct(PartnerContract $service)
    {
        $this->service = $service;
    }

    public function index()
    {
        return Inertia::render('master/partner/index');
    }

    public function fetch()
    {
        $data = $this->service->all(
            filters: ['name'],
            sorts: ['name', 'created_at', 'order'],
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
        return Inertia::render('master/partner/form', [
            "props" => $data,
        ]);
    }

    public function create()
    {
        return Inertia::render('master/partner/form');
    }

    public function store(PartnerRequest $request)
    {
        $payload = $request->validated();
        unset($payload['logo']);
        $result = $this->service->create($payload);
        return WebResponse::response($result, 'master.partner.index');
    }

    public function update(PartnerRequest $request, $id)
    {
        $payload = $request->validated();
        unset($payload['logo']);
        $result = $this->service->update(
            [
                ['id', '=', $id]
            ],
            $payload
        );
        return WebResponse::response($result, 'master.partner.index');
    }

    public function destroy($id)
    {
        $result = $this->service->destroy($id);
        return WebResponse::response($result, 'master.partner.index');
    }
}
