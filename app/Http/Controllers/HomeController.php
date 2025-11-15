<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Article;
use App\Models\Banner;
use App\Models\Category;
use App\Models\Event;
use App\Models\Partner;
use App\Models\Product;
use App\Models\Video;
use Inertia\Inertia;

class HomeController extends Controller
{

    public function index()
    {
        $banner = Banner::with('media')->get();
        $category = Category::with('media')->where('type', 'product')->get();
        $product = Product::with('media')->inRandomOrder()->limit(6)->get();
        $video = Video::with('media')->inRandomOrder()->limit(3)->get();
        $event = Event::with('media')->upcoming()->limit(3)->get();
        $article = Article::with('media')->inRandomOrder()->limit(3)->get();
        $partner = Partner::with('media')->where('is_featured', true)->ordered()->get();

        return Inertia::render('home', [
            'banner' => $banner,
            'category' => $category,
            'product' => $product,
            'video' => $video,
            'event' => $event,
            'article' => $article,
            'partner' => $partner,
        ]);
    }

    public function partnership()
    {
        return Inertia::render('partnership');
    }

    public function about()
    {
        return Inertia::render('about');
    }

    public function privacy_policy()
    {
        return Inertia::render('privacy-policy');
    }
}
