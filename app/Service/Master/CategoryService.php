<?php

namespace App\Service\Master;

use App\Contract\Master\CategoryContract;
use App\Models\Category;
use App\Service\BaseService;
use Illuminate\Database\Eloquent\Model;

class CategoryService extends BaseService implements CategoryContract
{
    protected Model $model;

    public function __construct(Category $model)
    {
        $this->model = $model;
    }
}
