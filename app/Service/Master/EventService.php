<?php 

namespace App\Service\Master;

use App\Contract\Master\EventContract;
use App\Models\Event;
use App\Service\BaseService;
use Illuminate\Database\Eloquent\Model;

class EventService extends BaseService implements EventContract
{
    protected Model $model;

    public function __construct(Event $model)
    {
        $this->model = $model;
    }

}