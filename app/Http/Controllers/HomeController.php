<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\RTUDevice;
use App\Logs;
use Auth;
use Feed;

class HomeController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth');
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Contracts\Support\Renderable
     */
    public function index()
    {
        $feed = Feed::loadRSS("http://feeds.bbci.co.uk/news/rss.xml");
     // Load index view
     return view('home');
    }
}
