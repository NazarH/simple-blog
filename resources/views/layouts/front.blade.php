<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
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
    <title>Document</title>
</head>
<body>
    <div class="container">
        <div class="content-wrapper">
            <div class="header">
                <div class="header__logo">
                    <a href="/">SimpleBlog</a>
                </div>
                <div class="header__search">
                    <form action="{{route('pages.search')}}">
                        @csrf
                        <input type="text" name="search" placeholder="Пошук...">
                        <button>
                            search
                        </button>
                    </form>
                </div>
                @if (Auth::user())
                    <div class="dropdown-menu dropdown-menu-end auth-user" aria-labelledby="navbarDropdown">
                        @if (Auth::user()->role === 'admin')
                            <a href="/admin">Адмін-панель</a>
                        @endif
                        <div>|</div>
                        @if (Auth::user())
                            <a href="/profile">Особистий кабінет</a>
                        @endif
                        <div>|</div>
                        <a class="dropdown-item" href="{{ route('logout') }}"
                        onclick="event.preventDefault();
                            document.getElementById('logout-form').submit();">
                            Вийти
                        </a>

                        <form id="logout-form" action="{{ route('logout') }}" method="POST" class="d-none">
                            @csrf
                        </form>
                    </div>
                @else
                    <div class="header__auth">
                        <a href="/login">Вхід</a>
                    </div>
                @endif
            </div>
            @yield('content')
        </div>
    </div>
</body>
<script src="https://cdn.ckeditor.com/ckeditor5/40.2.0/classic/ckeditor.js"></script>
<script src="{{asset('js/user/article.js')}}"></script>
</html>
