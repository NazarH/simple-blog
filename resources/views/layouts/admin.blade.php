<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>AdminLTE 3 | Dashboard 2</title>
  <!-- Google Font: Source Sans Pro -->
  <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,400i,700&display=fallback">
  <!-- Font Awesome Icons -->
  <link rel="stylesheet" href={{asset("plugins/fontawesome-free/css/all.min.css")}}>
  <!-- overlayScrollbars -->
  <link rel="stylesheet" href={{asset("plugins/overlayScrollbars/css/OverlayScrollbars.min.css")}}>
  <!-- Theme style -->
  <link rel="stylesheet" href={{asset("dist/css/adminlte.min.css")}}>

  <link rel="stylesheet" href={{asset("css/app.css")}}>
  <link rel="stylesheet" href={{asset("css/admin/form.css")}}>

</head>
<body class="hold-transition dark-mode sidebar-mini layout-fixed layout-navbar-fixed layout-footer-fixed">

<div class="wrapper">

  <!-- Preloader -->
  <div class="preloader flex-column justify-content-center align-items-center">
    <img class="animation__wobble" src={{asset("dist/img/AdminLTELogo.png")}} alt="AdminLTELogo" height="60" width="60">
  </div>

  <!-- Main Sidebar Container -->
  <aside class="main-sidebar sidebar-dark-primary elevation-4">
    <!-- Brand Logo -->
    <a href="/" class="brand-link">

      <span class="brand-text font-weight-light">Home</span>
    </a>

    <!-- Sidebar -->
    <div class="sidebar">
      <!-- Sidebar user panel (optional) -->
      <div class="user-panel mt-3 pb-3 mb-3 d-flex">
        <div class="image">
          <img src={{asset("dist/img/user2-160x160.jpg")}} class="img-circle elevation-2" alt="User Image">
        </div>
        <div class="info">
          <a href="/admin" class="d-block">{{ Auth::user()->login }}</a>
        </div>
      </div>

      <!-- Sidebar Menu -->
      <nav class="mt-2">
        <ul class="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
          <li class="nav-item">
            <a href="{{route('admin.tags.index')}}" class="nav-link">

              <p>
                Tags
              </p>
            </a>
          </li>
          <li class="nav-item">
            <a href="{{route('admin.rubrics.index')}}" class="nav-link">

              <p>
                Rubrics
              </p>
            </a>
          </li>
          <li class="nav-item">
            <a href="{{route('admin.articles.index')}}" class="nav-link">

              <p>
                Articles
              </p>
            </a>
          </li>
          <li class="nav-item">
            <a href="{{route('admin.users.index')}}" class="nav-link">

              <p>
                Users
              </p>
            </a>
          </li>
  </aside>

  <!-- Content Wrapper. Contains page content -->
  <div class="content-wrapper">
    @yield('content')
  </div>
  <!-- /.content-wrapper -->

  <!-- Control Sidebar -->
  <aside class="control-sidebar control-sidebar-dark">
    <!-- Control sidebar content goes here -->
  </aside>
  <!-- /.control-sidebar -->
</div>
<!-- ./wrapper -->

<!-- REQUIRED SCRIPTS -->
<!-- jQuery -->
<script src={{asset("plugins/jquery/jquery.min.js")}}></script>
<!-- Bootstrap -->
<script src={{asset("plugins/bootstrap/js/bootstrap.bundle.min.js")}}></script>
<!-- overlayScrollbars -->
<script src={{asset("plugins/overlayScrollbars/js/jquery.overlayScrollbars.min.js")}}></script>
<!-- AdminLTE App -->
<script src={{asset("dist/js/adminlte.js")}}></script>

<!-- PAGE PLUGINS -->
<!-- jQuery Mapael -->
<script src={{asset("plugins/jquery-mousewheel/jquery.mousewheel.js")}}></script>
<script src={{asset("plugins/raphael/raphael.min.js")}}></script>
<script src={{asset("plugins/jquery-mapael/jquery.mapael.min.js")}}></script>
<script src={{asset("plugins/jquery-mapael/maps/usa_states.min.js")}}></script>
<!-- ChartJS -->
<script src={{asset("plugins/chart.js/Chart.min.js")}}></script>

<script src={{asset("js/admin/scripts.js")}}></script>

@vite('resources/js/app.js')
<script src="https://cdn.ckeditor.com/ckeditor5/40.2.0/classic/ckeditor.js"></script>

<script>
    ClassicEditor
    .create( document.querySelector('#editor'), {
        ckfinder: {
            uploadUrl: 'http://pet-blog.test/admin/articles/upload'
        },
        toolbar: {
            items: [
                'heading', '|',
                'bold', 'italic', 'underline', 'strikethrough', 'subscript', 'superscript', '|',
                'blockQuote', 'code', 'link', 'imageUpload', '|',
                'undo', 'redo'
            ],
        },
    } );
</script>

</body>
</html>

