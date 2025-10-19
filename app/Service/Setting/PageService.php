<?php

namespace App\Service\Setting;

use App\Contract\Setting\PageContract;
use App\Models\Page;
use App\Service\BaseService;
use Illuminate\Database\Eloquent\Model;

class PageService extends BaseService implements PageContract
{

    protected Model $model;

    public function __construct(Page $model)
    {
        $this->model = $model;
    }
}
