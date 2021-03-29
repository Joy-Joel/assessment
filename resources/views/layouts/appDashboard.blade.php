<!doctype html>
<html lang="en-US">

<head>
    <meta charset="utf-8" />
    <meta http-equiv="Content-type" content="text/html; charset=utf-8" />
    <title> @yield('title') | {{ Auth::user()->name }}</title>
    <meta name="description" content="" />
    <meta name="Susej" content="Susej IoT" />
    <meta name="csrf-token" content="{{ csrf_token() }}" />

    <!-- mobile settings -->
    <meta name="viewport" content="width=device-width, maximum-scale=1, initial-scale=1, user-scalable=0" />

    <!-- WEB FONTS -->
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.6.3/css/all.css"
        integrity="sha384-UHRtZLI+pbxtHCWp1t77Bi1L4ZtiqrqD80Kn4Z8NTSRyMA2Fd33n5dQ8lWUE00s/" crossorigin="anonymous">
    <link
        href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,700,800&amp;subset=latin,latin-ext,cyrillic,cyrillic-ext"
        rel="stylesheet" type="text/css" />
    <link type="text/css" href="{{ asset('assets/plugins/datatables/css/jquery.dataTables.min.css') }}" />
    <link type="text/css" rel="stylesheet"
        href="https://cdn.datatables.net/buttons/1.6.1/css/buttons.dataTables.min.css">

    <!-- CORE CSS -->
    <link href="{{ asset('assets/plugins/bootstrap/css/bootstrap.min.css') }}" rel="stylesheet" type="text/css" />
    <link href="{{ asset('assets/plugins/select2/css/select2.min.css') }}" rel="stylesheet" type="text/css" />
    <!-- THEME CSS -->
    <link href="{{ asset('assets/css/essentials.css') }}" rel="stylesheet" type="text/css" />


    <link href="{{ asset('assets/css/layout.css') }}" rel="stylesheet" type="text/css" />
    <link href="{{ asset('assets/css/color_scheme/green.css') }}" rel="stylesheet" type="text/css" id="color_scheme" />

    <!-- PAGE LEVEL STYLES -->
    <link href="{{ asset('assets/css/layout-datatables.css') }}" rel="stylesheet" type="text/css" />

    <link type="text/css" rel="stylesheet" href="{{ asset('css/bootstrap4-toggle.min.css') }}" />

    <!-- PAGE LEVEL STYLES -->
    <link href="{{ asset('assets/css/layout-datatables.css') }}" rel="stylesheet" type="text/css" />

    <link type="text/css" rel="stylesheet" href="{{ asset('css/bootstrap4-toggle.min.css') }}" />

</head>

<body>
    <audio id="notifyBeep" hidden>
        <source src="{{asset('media/beepa.mp3')}}" type="audio/mpeg">
    </audio>

    <!-- WRAPPER -->
    <div id="wrapper" class="clearfix">
        @include('partials.navbar')
        @include('partials.user-sidebar')
        @yield('content')
    </div>
   
    <!-- JAVASCRIPT FILES -->
    <script type="text/javascript" src="{{ asset('assets/plugins/jquery/jquery-2.2.3.min.js') }}"></script>
    <script type="text/javascript" src="{{ asset('assets/plugins/bootstrap/js/bootstrap.min.js') }}"></script>
    <script type="text/javascript" src="{{ asset('assets/plugins/select2/js/select2.full.min.js') }}"></script>
    <script type="text/javascript" src="{{ asset('js/apptable.js') }}"></script>
    <script type="text/javascript" src="{{ asset('assets/plugins/datatables/js/jquery.dataTables.min.js') }}">
    </script>
    
    <script type="text/javascript" src="{{ asset('assets/plugins/datatables/dataTables.bootstrap.js') }}"></script>
    <script src="https://cdn.datatables.net/buttons/1.6.1/js/buttons.flash.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jszip/3.1.3/jszip.min.js"></script>
    <script src="https://cdn.datatables.net/buttons/1.6.1/js/buttons.html5.min.js"></script>
    <script src="https://cdn.datatables.net/buttons/1.6.1/js/buttons.print.min.js"></script>

    <script type="text/javascript" src="{{ asset('js/bootstrap4-toggle.min.js') }}"></script>


</body>