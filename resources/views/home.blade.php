@extends('layouts.appDashboard')

@section('title', 'Dashboard | RSS Feed')
@section('content')

<section id="middle">

    <!-- page title -->
    <header id="page-header">
        <div class="row">
            <div class="col-md-11">
                <h1 style="margin:0px"><strong>{{ Auth::user()->name }}</strong></h1>
                <h4>User  Overview </h4>
            </div>
            <!-- <div class="col-md-1 col-sm-1" style="float: right">
                <input type="checkbox" checked data-toggle="toggle" data-on="Sound<br>Enabled"
                    data-off="Sound<br>Disabled" id="soundctrl" data-width="80" data-size="small" data-onstyle="success"
                    data-offstyle="danger">

            </div> -->
        </div>

        

    </header>

    

        <div id="panel-1" class="panel panel-default" style="margin-top:10px">
            <div class="panel-heading">

                <!-- right options -->
                <ul class="options pull-right list-inline">
                    <li><a href="#" class="opt panel_colapse" data-toggle="tooltip" title="Colapse"
                            data-placement="bottom"></a></li>
                    <li><a href="#" class="opt panel_fullscreen hidden-xs" data-toggle="tooltip" title="Fullscreen"
                            data-placement="bottom"><i class="fa fa-expand"></i></a></li>
                </ul>
                <!-- /right options -->
            </div>
            <!-- panel content -->
            
        </div>
        <div id="mymap" style="width: auto;height: 800px;"></div>
    </div>
</section>
<script src="https://maps.google.com/maps/api/js?key=AIzaSyCn5ARfEvG7ivp5u-yX80YZF1DKHd8u7n4"></script>
<script type="text/javascript" src="{{ asset('assets/plugins/jquery/jquery-2.2.3.min.js') }}"></script>
<script type="text/javascript" src="{{ asset('js/pages/siteuserdashboard.js')}}"></script>
>

@endsection