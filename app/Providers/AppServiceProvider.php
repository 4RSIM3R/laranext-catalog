<?php

namespace App\Providers;

use App\Contract\Auth\UserAuthContract;
use App\Contract\AuthContract;
use App\Contract\BaseContract;
use App\Contract\Master\BannerContract;
use App\Contract\Master\CategoryContract;
use App\Contract\Master\EventContract;
use App\Contract\Master\FileContract;
use App\Contract\Master\PostContract;
use App\Contract\Master\ProductContract;
use App\Contract\Master\UserContract;
use App\Contract\Master\VideoContract;
use App\Contract\Setting\PageContract;
use App\Contract\Setting\SettingContract;
use App\Service\Setting\SettingService;
use App\Service\Auth\UserAuthService;
use App\Service\AuthService;
use App\Service\BaseService;
use App\Service\Master\BannerService;
use App\Service\Master\CategoryService;
use App\Service\Master\EventService;
use App\Service\Master\FileService;
use App\Service\Master\PostService;
use App\Service\Master\ProductService;
use App\Service\Master\UserService;
use App\Service\Master\VideoService;
use App\Service\Setting\PageService;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        // base
        $this->app->bind(AuthContract::class, AuthService::class);
        $this->app->bind(BaseContract::class, BaseService::class);

        // auth
        $this->app->bind(UserAuthContract::class, UserAuthService::class);

        // master
        $this->app->bind(BannerContract::class, BannerService::class);
        $this->app->bind(CategoryContract::class, CategoryService::class);
        $this->app->bind(EventContract::class, EventService::class);
        $this->app->bind(FileContract::class, FileService::class);
        $this->app->bind(ProductContract::class, ProductService::class);
        $this->app->bind(UserContract::class, UserService::class);
        $this->app->bind(VideoContract::class, VideoService::class);

        // setting
        $this->app->bind(SettingContract::class, SettingService::class);
        $this->app->bind(PageContract::class, PageService::class);
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        //
    }
}
