<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <meta name="viewport" content="width=1440">
    <link rel="stylesheet" href='{{asset("css/user/user.css")}}'>
    <link rel="stylesheet" href='{{asset("css/user/profile.css")}}'>
    <link rel="stylesheet" href='{{asset("css/app.css")}}'>
    <link rel="stylesheet" href='{{asset("css/user/article.css")}}'>
    <link rel="stylesheet" href='{{asset("css/user/index.css")}}'>
    <link rel="stylesheet" href='{{asset("css/user/auth.css")}}'>
    <link rel="stylesheet" href='{{asset("css/user/header.css")}}'>
    <link rel="stylesheet" href='{{asset("css/user/login.css")}}'>
    <link rel="stylesheet" href='{{asset("css/user/register.css")}}'>
    <link rel="stylesheet" href='{{asset("css/user/ckeditor.css")}}'>
    <link rel="stylesheet" href='{{asset("css/user/comment.css")}}'>
    <link rel="stylesheet" href="{{asset("css/user/footer.css")}}">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css"
          rel="stylesheet"
          integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN"
          crossorigin="anonymous">
    <link rel="stylesheet" href="{{asset("css/user/bootstrap.css")}}">
    <title>SimpleBlog</title>
</head>
<body>
    <div class="container">
        <div class="content-wrapper">
            <div class="header">
                <div class="header__block">
                    <div class="header__logo">
                        <a href="/">
                            <span class="header__simple">Simple</span>Blog
                        </a>
                    </div>
                    <div class="header__icons">
                        @if (Auth::user())
                            <i
                                class="fa-solid fa-bars custom-icon"
                                id="bar"
                                onclick="showDropdown()"
                            >
                            </i>
                        @else
                            <a href="/login">
                                <i class="fa-solid fa-user custom-icon"></i>
                            </a>
                        @endif
                    </div>
                </div>

            </div>
            @yield('content')
        </div>
    </div>
    @if (Auth::user())
        <div
            class="auth-user"
            id="dropdown"
            aria-labelledby="navbarDropdown"
        >
            <div class="close-nav" onclick="closeNav()">×</div>

            @if (Auth::user())
                <a class="top-menu-item top-border" href="/profile">Особистий кабінет</a>
            @endif

            @if (Auth::user()->role === 'admin')
                <a class="top-menu-item" href="/admin">Адмін-панель</a>
            @endif

            <a
                class="top-menu-item"
                href="{{ route('logout') }}"
                onclick="
                    event.preventDefault();
                    document.getElementById('logout-form').submit();
                "
            >
                Вийти
            </a>

            <form
                id="logout-form"
                action="{{ route('logout') }}"
                method="POST"
                class="d-none"
            >
                @csrf
            </form>
        </div>
    @endif
</body>

<script src="{{asset('js/user/homescripts.js')}}"></script>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL"
        crossorigin="anonymous"></script>
</html>
