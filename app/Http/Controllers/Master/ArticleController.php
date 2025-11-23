<?php

namespace App\Http\Controllers\Master;

use App\Contract\Master\ArticleContract;
use App\Http\Controllers\Controller;
use App\Http\Requests\ArticleRequest;
use App\Utils\WebResponse;
use Inertia\Inertia;

class ArticleController extends Controller
{
    protected ArticleContract $service;

    public function __construct(ArticleContract $service)
    {
        $this->service = $service;
    }

    public function index()
    {
        return Inertia::render('master/article/index');
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
        return Inertia::render('master/article/form', [
            "props" => $data,
        ]);
    }

    public function create()
    {
        return Inertia::render('master/article/form');
    }

    public function store(ArticleRequest $request)
    {
        $payload = $request->validated();
        unset($payload['thumbnail']);
        $result = $this->service->create($payload);
        return WebResponse::response($result, 'master.article.index');
    }

    public function update(ArticleRequest $request, $id)
    {
        $payload = $request->validated();
        unset($payload['thumbnail']);
        $result = $this->service->update(
            [
                ['id', '=', $id]
            ],
            $payload
        );
        return WebResponse::response($result, 'master.article.index');
    }

    public function destroy($id)
    {
        $result = $this->service->destroy($id);
        return WebResponse::response($result, 'master.article.index');
    }
}
