<?php

namespace App\Service\Master;

use App\Contract\Master\VideoContract;
use App\Models\Video;
use App\Service\BaseService;
use Illuminate\Database\Eloquent\Model;

class VideoService extends BaseService implements VideoContract
{
    protected Model $model;
    protected array $fileKeys = ['thumbnail', 'video'];

    public function __construct(Video $model)
    {
        $this->model = $model;
    }
}
