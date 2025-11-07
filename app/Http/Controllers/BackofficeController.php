<?php

namespace App\Http\Controllers;

use App\Models\Article;
use App\Models\Banner;
use App\Models\Category;
use App\Models\Event;
use App\Models\File;
use App\Models\Product;
use App\Models\User;
use App\Models\Video;
use Inertia\Inertia;

use function Pest\Laravel\post;

class BackofficeController extends Controller
{

    public function index()
    {
        $article = Article::count();
        $banner = Banner::count();
        $category = Category::count();
        $event = Event::count();
        $file = File::count();
        $product = Product::count();
        $video = Video::count();
        $user = User::count();
        return Inertia::render('backoffice/index', [
            'article' => $article,
            'banner' => $banner,
            'category' => $category,
            'event' => $event,
            'file' => $file,
            'product' => $product,
            'video' => $video,
            'user' => $user,
        ]);
    }
}
