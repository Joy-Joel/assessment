<!-- HEADER -->
<header id="header">

    <!-- Mobile Button -->
    <button id="mobileMenuBtn"></button>

    <!-- Logo -->
    <span class="logo pull-left" style="margin-top: 10px">
        <a class="float-left" href="{{url('/')}}">
            <h4 style="color:white"><img src="{{asset('img/logo.jpg')}}" width="40px" height="35px" alt="Susej IoT">
                Susej IoT</h4>
        </a>
    </span>

    <!-- <form method="get" action="page-search.html" class="search pull-left hidden-xs">
        <input type="text" class="form-control" name="k" placeholder="Search for something..." />
    </form> -->

    <nav>

        <!-- OPTIONS LIST -->
        <ul class="nav pull-right">

            <!-- USER OPTIONS -->
            <li class="dropdown pull-left">
                <a href="#" class="dropdown-toggle" data-toggle="dropdown" data-hover="dropdown"
                    data-close-others="true">
                    <img class="user-avatar" alt="" src="{{asset(Auth::user()->image) }}" height="34" />
                    <span class="user-name">
                        <span class="hidden-xs">
                            {{ Auth::user()->name }} <i class="fa fa-angle-down"></i>
                        </span>
                    </span>
                </a>
                <ul class="dropdown-menu hold-on-click">
                    <!-- <li> -->
                        <!-- settings -->
                        <!-- <a class="dropdown-item account" data-toggle="modal" data-id="{{ Auth::user()->id}}"
                            data-target="#modal-edit-profile"><i class="fa fa-cogs"></i>
                            Account Settings
                        </a>
                    </li> -->

                    <!-- <li class="divider"></li> -->

                    <li>
                        <!-- logout -->
                        <a href="{{ url('/logout') }}" class="dropdown-item"
                            onclick="event.preventDefault(); document.getElementById('logout-form').submit();">
                            <i class="fa fa-sign-out"></i> Logout
                        </a>
                        <form id="logout-form" action="{{ url('/logout') }}" method="POST" style="display: none;">
                            {{ csrf_field() }}
                        </form>
                    </li>
                </ul>
            </li>
            <!-- /USER OPTIONS -->

        </ul>
        <!-- /OPTIONS LIST -->

    </nav>

</header>



<!-- /HEADER -->