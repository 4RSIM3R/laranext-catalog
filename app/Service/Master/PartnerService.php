<?php

namespace App\Service\Master;

use App\Contract\Master\PartnerContract;
use App\Models\Partner;
use App\Service\BaseService;
use Illuminate\Database\Eloquent\Model;

class PartnerService extends BaseService implements PartnerContract
{
    protected Model $model;

    protected array $relation = [];

    protected array $fileKeys = ['logo'];

    public function __construct(Partner $model)
    {
        $this->model = $model;
    }
}
