<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>AdminLTE 3 | Dashboard 2</title>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,400i,700&display=fallback">
        <link rel="stylesheet" href={{asset("plugins/fontawesome-free/css/all.min.css")}}>
        <link rel="stylesheet" href={{asset("plugins/overlayScrollbars/css/OverlayScrollbars.min.css")}}>
        <link rel="stylesheet" href={{asset("dist/css/adminlte.min.css")}}>
        <link rel="stylesheet" href={{asset("css/app.css")}}>
        <link rel="stylesheet" href={{asset("css/admin/form.css")}}>

        @routes
        @viteReactRefresh
        @vite(['resources/js/app.jsx', "resources/js/Pages/{$page['component']}.jsx"])
        @inertiaHead
    </head>
    <body class="hold-transition dark-mode sidebar-mini layout-fixed layout-navbar-fixed layout-footer-fixed">
        <div class="wrapper">

            <div id="root" class="content-wrapper">
                @inertia
            </div>

        </div>
    </body>

    <script>
        window.csrfToken = "{{ csrf_token() }}";
    </script>
    <script src={{asset("plugins/jquery/jquery.min.js")}}></script>
    <script src={{asset("plugins/bootstrap/js/bootstrap.bundle.min.js")}}></script>
    <script src={{asset("plugins/overlayScrollbars/js/jquery.overlayScrollbars.min.js")}}></script>
    <script src={{asset("dist/js/adminlte.js")}}></script>
    <script src={{asset("plugins/jquery-mousewheel/jquery.mousewheel.js")}}></script>
    <script src={{asset("plugins/raphael/raphael.min.js")}}></script>
    <script src={{asset("plugins/jquery-mapael/jquery.mapael.min.js")}}></script>
    <script src={{asset("plugins/jquery-mapael/maps/usa_states.min.js")}}></script>
    <script src={{asset("plugins/chart.js/Chart.min.js")}}></script>
    <script src={{asset("js/admin/scripts.js")}}></script>

    @vite('resources/js/app.js')

</html>
