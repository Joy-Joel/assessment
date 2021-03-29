<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>{{ __('Assessment') }}</title>

    <!-- Scripts -->
    {{-- <script src="{{ asset('js/app.js') }}" defer></script>
    --}}

    <!-- Fonts -->
    <link rel="dns-prefetch" href="//fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css?family=Nunito" rel="stylesheet">

    <!-- Styles -->
    <link href="{{ asset('css/select2.min.css') }}" rel="stylesheet">
    <link href="{{ asset('css/chart.css') }}" rel="stylesheet">
    <link href="{{ asset('css/adminlte.min.css') }}" rel="stylesheet">
    <link href="{{ asset('css/icheck-bootstrap.min.css') }}" rel="stylesheet">

    <link href="{{ asset('css/toastr.css') }}" rel="stylesheet">

    <link type="text/css" rel="stylesheet" href="{{ asset('css/bootstrap4-toggle.min.css') }}" />
    <!-- Google Font: Source Sans Pro -->
    <link href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,400i,700" rel="stylesheet">
    <style>
        .container-login100::before {
            content: "";
            display: block;
            position: absolute;
            z-index: -1;
            width: 100%;
            height: 100%;
            top: 0;
            left: 0;
            background-color: rgba(0, 0, 0, 0.65);
        }

    </style>
</head>

<body class="container-login100"
    style=" background-repeat: no-repeat; background-position: center; background-size: cover;">
    <!-- background-image: url('images/bg-01.jpg'); -->
    <div id="app">
        <nav class="navbar navbar-expand-md navbar-light bg-white shadow-sm">
            <div class="container">
                <a class="navbar-brand" href="{{ url('/') }}">
                    Assessment </a>
                <button class="navbar-toggler" type="button" data-toggle="collapse"
                    data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                    aria-label="{{ __('Toggle navigation') }}">
                    <span class="navbar-toggler-icon"></span>
                </button>

                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <!-- Left Side Of Navbar -->
                    <ul class="navbar-nav mr-auto">

                    </ul>

                    <!-- Right Side Of Navbar -->
                    <ul class="navbar-nav ml-auto">
                        <!-- Authentication Links -->
                        @guest
                            {{-- <li class="nav-item">
                                <a class="nav-link" href="{{ route('login') }}">{{ __('Login') }}</a>
                            </li> --}}
                            @if (Route::has('register'))
                                {{-- <li class="nav-item">
                                    <a class="nav-link" href="{{ route('register') }}">{{ __('Register') }}</a>
                                </li> --}}
                            @endif
                        @else
                            <li class="nav-item dropdown">
                                <a id="navbarDropdown" class="nav-link dropdown-toggle" href="#" role="button"
                                    data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" v-pre>
                                    {{ Auth::user()->name }} <span class="caret"></span>
                                </a>

                                <div class="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
                                    <a class="dropdown-item" href="{{ route('logout') }}"
                                        onclick="event.preventDefault();
                                                                                                                         document.getElementById('logout-form').submit();">
                                        {{ __('Logout') }}
                                    </a>

                                    <form id="logout-form" action="{{ route('logout') }}" method="POST"
                                        style="display: none;">
                                        @csrf
                                    </form>
                                </div>
                            </li>
                        @endguest
                    </ul>
                </div>
            </div>
        </nav>

        <main class="py-4">
            @yield('content')
        </main>
    </div>

    <script src="{{ asset('js/jquery.min.js') }}"></script>
    <script src="{{ asset('js/bootstrap.bundle.min.js') }}"></script>
    <script type="text/javascript" src="{{ asset('js/bootstrap4-toggle.min.js') }}"></script>
    <script src="{{ asset('js/select2.min.js') }}"></script>
    <script src="{{ asset('js/toastr.js') }}"></script>
    <script>
        $('.select2').select2();
        // $("[name='line1']").bootstrapSwitch('state', true);
        // $("[name='line2']").bootstrapSwitch('state', true);
        // $("[name='line3']").bootstrapSwitch('state', true);
        $(document).ready(function() {

            $.ajaxSetup({
                headers: {
                    "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content")
                }
            });
            var energy = 0;
            var iscontrol = false;
            var isStart = true;

            const valuegenerator = (min, max) => {
                return (Math.random() * (max - min) + min).toFixed(2);
            }
            const delay = (min, max) => {
                return Math.floor((Math.random() * (max - min) + min));
            }
            var buyenergy = valuegenerator(1000, 5000);
            document.getElementById("buy").innerText = buyenergy;
            $("#buy").append("<span style='font-size: 20px'> kWh</span>");
            setInterval(function() {

                var volt_one = valuegenerator(180, 240);
                var volt_two = valuegenerator(180, 240);
                var volt_three = valuegenerator(180, 240);
                document.getElementById("R_volt").innerHTML = volt_one + "V";
                document.getElementById("Y_volt").innerHTML = volt_two + "V";
                document.getElementById("B_volt").innerHTML = volt_three + "V";
                if (iscontrol) {
                    var cur_one = valuegenerator(10, 120);
                    var cur_two = valuegenerator(10, 120);
                    var cur_three = valuegenerator(10, 120);
                    //  document.getElementById("unitused").innerText = "kWh";

                    document.getElementById("R_Amp").innerHTML = cur_one + "A";
                    document.getElementById("Y_Amp").innerHTML = cur_two + "A";
                    document.getElementById("B_Amp").innerHTML = cur_three + "A";

                    var usedpower = (volt_one * cur_one) + (volt_two * cur_two) + (volt_three *
                        cur_three);

                    usedpower = usedpower / 3600000;

                    energy = energy + usedpower;

                    document.getElementById("used").innerText = energy.toFixed(3);
                    $("#used").append("<span style='font-size: 20px'> kWh</span>");
                } else {
                    document.getElementById("R_Amp").innerHTML = 0 + "A";
                    document.getElementById("Y_Amp").innerHTML = 0 + "A";
                    document.getElementById("B_Amp").innerHTML = 0 + "A";
                    document.getElementById("used").innerText = energy.toFixed(3);
                    $("#used").append("<span style='font-size: 20px'> kWh</span>");
                }
            }, delay(1000, 5000));
            //load house data from db
            var listval = "null";
            $getFeedbck = false;
            $('#houselist').on("select2:select", function(e) {
                var list = $("#houselist :selected").text();
                listval = $("#houselist :selected").val();
                $('#selecthouse').text(list);
                $('#serialnumber').val(listval);
                $('#housename').val(list);
                console.log(list);
                console.log(listval);
                $.getdata(listval);
            });
            $("#clickaction").click(function(e) {
                var list = $("#houselist :selected").text();
                var listval = $("#houselist :selected").val();
                console.log(list);
                console.log(listval);
                toastr.info(
                    "Sending command. Please wait!!!", {
                        timeOut: 100
                    }
                );
                var statusA = $("#ctrlbutA").prop("checked");
                if (list.indexOf('Select house') == -1) {
                    $.sendData(listval, statusA);

                } else {
                    alert('Please select a house from the list');
                    return;
                }
            });

            setInterval(() => {
                if ($getFeedbck) {
                    $.getdata(listval);
                }

            }, 1000);

            $.getdata = function(serial) {
                $.ajax('/getcontrol/' + serial, // request url
                    {
                        success: function(data, status, xhr) { // success callback function
                            //console.log(data);
                            if (isStart) {
                                if (data['control'].c1 == '1') {
                                    $('#ctrlbutA').bootstrapToggle('on')

                                } else {

                                    $('#ctrlbutA').bootstrapToggle('off')
                                    iscontrol = false;
                                }
                                isStart = false;
                            }


                            if (data['feedback'].f1 == '1') {
                                $('#radio1').removeClass('icheck-danger').addClass(
                                    'icheck-success');
                                iscontrol = true;
                            } else {
                                $('#radio1').removeClass('icheck-success').addClass(
                                    'icheck-danger');
                                iscontrol = false;
                            }

                            $("#clientview").show();

                        }
                    });
            }

            $.sendData = (serial_number, line1) => {
                console.log("send data");
                $.ajax({
                    type: "POST",
                    url: "/savecommand",
                    data: {
                        serialnumber: serial_number,
                        line1: line1
                    },
                    success: function(data) {
                        console.log(data);
                        $getFeedbck = true;
                        if (data.status == 200) {
                            $.getdata(listval);
                            toastr.success(
                                "Command sent successfully.<br>Please wait for confirmation feedback", {
                                    timeOut: 500
                                }
                            );
                            // if (iscontrol == false) {
                            //     iscontrol = true;
                            // } else {
                            //     iscontrol = false;
                            // }
                        }
                    },
                    error: function(e) {
                        toastr.warning("Error occur!!! Try again", {
                            timeOut: 5000
                        });
                    }
                });
            };


        });

    </script>
</body>

</html>
