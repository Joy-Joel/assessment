<aside id="aside">
    <nav id="sideNav">
        <!-- MAIN MENU -->
        <ul class="nav nav-list">
            {{-- <div class="" style="margin-top:20px">
                        <a href="{{url('/home')}}">
            <img class="media-object img-thumbnail user-img rounded-circle admin_img3" alt="User Picture"
                src="{{ url('/'.Auth::user()->image )}}">
            <span style="color:white">Welcome {{ Auth::user()->name }}</span>
            </a>
            </div> --}}
            <br>
            <br>
            <li class="active">
                <!-- dashboard -->
                <a class="dashboard" href="{{url('/home')}}">
                    <!-- warning - url used by default by ajax (if eneabled) -->
                    <i class="main-icon fa fa-home"></i> <span>Dashboard</span>
                </a>
            </li>

            <li>
                <a href="{{url('/rss')}}">
                    <i class="fa fa-menu-arrow pull-right"></i>
                    <i class="main-icon fa fa-bar-chart"></i> <span> RSS Feed </span>
                </a>

            </li>

            

        </ul>


    </nav>

    <span id="asidebg">
        <!-- aside fixed background --></span>
</aside>