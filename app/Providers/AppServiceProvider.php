<?php

namespace App\Providers;

use App\Contract\Auth\UserAuthContract;
use App\Contract\AuthContract;
use App\Contract\BaseContract;
use App\Service\Auth\UserAuthService;
use App\Service\AuthService;
use App\Service\BaseService;
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
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        //
    }
}
