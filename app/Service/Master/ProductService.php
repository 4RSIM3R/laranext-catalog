<?php

namespace App\Service\Master;

use App\Contract\Master\ProductContract;
use App\Models\Product;
use App\Service\BaseService;
use Illuminate\Database\Eloquent\Model;

class ProductService extends BaseService implements ProductContract
{
    protected Model $model;

    protected array $fileKeys = ['thumbnail'];

    public function __construct(Product $model)
    {
        $this->model = $model;
    }
}
