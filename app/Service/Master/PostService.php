<?php

namespace App\Service\Master;

use App\Contract\Master\PostContract;
use App\Models\Post;
use App\Service\BaseService;
use Illuminate\Database\Eloquent\Model;

class PostService extends BaseService implements PostContract
{
    protected Model $model;

    public function __construct(Post $model)
    {
        $this->model = $model;
    }
}
