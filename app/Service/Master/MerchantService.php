<?php

namespace App\Service\Master;

use App\Contract\Master\MerchantContract;
use App\Models\Merchant;
use App\Service\BaseService;
use Illuminate\Database\Eloquent\Model;

class MerchantService extends BaseService implements MerchantContract
{
    protected Model $model;
    protected array $relation = ['thumbnail'];

    public function __construct(Merchant $model)
    {
        $this->model = $model;
    }
}
