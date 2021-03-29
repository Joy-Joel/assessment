@extends('layouts.appHome')

@section('content')
@php
$feed = Feed::loadRSS("http://feeds.bbci.co.uk/news/rss.xml");
@endphp
    @if ($msg = Session::get('success'))
        <div class="alert alert-success alert-block">
            <button type="button" class="close" data-dismiss="alert">×</button>
            <strong>Command sent</strong>
        </div>
        {{-- {{ \Session::flush() }} --}}
    @endif
    @if ($message = Session::get('error'))
        <div class="alert alert-warning alert-block">
            <button type="button" class="close" data-dismiss="alert">×</button>
            <strong>{{ $message }}</strong>
        </div>
        {{-- {{ \Session::flush() }} --}}
    @endif
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-10">

                    <channel>
                        <title><![CDATA[ assessment ]]></title>
                        <link><![CDATA[ https://your-website.com/feed ]]></link>
                        <description><![CDATA[ Your website description ]]></description>
                        <pubDate>{{ now() }}</pubDate>
                
                        @foreach ($feed as $item)
                        <tbody>
                          <div class="card">
                            <div class="card-header">
                              <a href="{{ $item->link }}">{{ $item->title}}</a>
                            </div>
                
                            <div class="card-header">
                              <a href="{{ $item->link }}">{{ $item->thumbnail}}</a>
                            </div>
                            <div class="card-body">
                              {{$item->description}}
                            </div>
                          </div>
                        </tbody>
                        @endforeach

                    </channel>
                </rss>

            </div>
        </div>

    </div>

@endsection
