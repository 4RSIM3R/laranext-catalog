<?php

namespace App\Service\Master;

use App\Contract\Master\FileContract;
use App\Models\File;
use App\Service\BaseService;
use Illuminate\Database\Eloquent\Model;

class FileService extends BaseService implements FileContract
{
    protected Model $model;

    public function __construct(File $model)
    {
        $this->model = $model;
    }
}
