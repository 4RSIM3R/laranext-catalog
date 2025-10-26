<?php

namespace App\Service\Master;

use App\Contract\Master\BannerContract;
use App\Models\Banner;
use App\Service\BaseService;
use Illuminate\Database\Eloquent\Model;

class BannerService extends BaseService implements BannerContract
{
    protected Model $model;
    protected array $fileKeys = ['thumbnail'];

    public function __construct(Banner $model)
    {
        $this->model = $model;
    }
}
