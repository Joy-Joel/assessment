<?php
namespace App\Services;

class RssFeedService{

    public function rssFeed(){
        $feed = Feed::loadRSS("http://feeds.bbci.co.uk/news/rss.xml");
        // $num_items = 5;
        // $rss = fetch_rss($feed);

        // $items = array_slice($rss->items, 0, $num_items);

    }


}


