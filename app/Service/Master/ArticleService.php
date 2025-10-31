<?php

namespace App\Service\Master;

use App\Contract\Master\ArticleContract;
use App\Models\Article;
use App\Service\BaseService;
use Illuminate\Database\Eloquent\Model;

class ArticleService extends BaseService implements ArticleContract
{
    protected Model $model;

    protected array $fileKeys = ['thumbnail'];

    public function __construct(Article $model)
    {
        $this->model = $model;
    }
}
