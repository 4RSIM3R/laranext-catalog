<?php

namespace App\Http\Controllers\Auth;

use App\Contract\Auth\UserAuthContract;
use App\Http\Controllers\Controller;
use App\Utils\WebResponse;
use Inertia\Inertia;
use Laravel\Fortify\Http\Requests\LoginRequest;

class UserAuthController extends Controller
{

    protected UserAuthContract $auth;

    public function __construct(UserAuthContract $auth)
    {
        $this->auth = $auth;
    }

    public function login()
    {
        return Inertia::render('auth/login');
    }

    public function attempt(LoginRequest $request)
    {
        $payload = $request->validated();
        $result = $this->auth->login($payload);
        return WebResponse::response($result, 'backoffice.index');
    }

    public function logout()
    {
        $result = $this->auth->logout();
        return WebResponse::response($result, 'login');
    }
}
