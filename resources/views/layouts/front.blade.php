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
    <link rel="stylesheet" href="{{asset("css/user/footer.css")}}">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">

    <title>Document</title>
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
                    <div class="header__search">
                        <form action="{{route('pages.search')}}">
                            @csrf
                            <input type="text" name="search" placeholder="Пошук..." id="search">
                        </form>
                    </div>
                    <div class="header__icons">
                        <i class="fa-solid fa-magnifying-glass custom-icon" onclick="showSearch()"></i>
                        @if (Auth::user())
                            <i class="fa-solid fa-bars custom-icon" onclick="showDropdown()"></i>
                        @else
                            <a href="/login">
                                <i class="fa-solid fa-user custom-icon"></i>
                            </a>
                        @endif
                    </div>
                </div>
                <ul class="nav">
                    @foreach ($rubrics as $rubric)
                        <li class="nav__item">
                            <a href="{{route('pages.rubric', $rubric['id'])}}">{{ $rubric['name'] }}</a>
                        </li>
                    @endforeach
                </ul>
            </div>
            @yield('content')
        </div>
    </div>
    @if (Auth::user())
        <div class="dropdown-menu dropdown-menu-end auth-user" id="dropdown" aria-labelledby="navbarDropdown">
            @if (Auth::user()->role === 'admin')
                <a class="top-menu-item" href="/admin">Адмін-панель</a>
            @endif
            @if (Auth::user())
                <a class="top-menu-item" href="/profile">Особистий кабінет</a>
            @endif
            <a
               class="dropdown-item top-menu-item"
               href="{{ route('logout') }}"
               onclick="event.preventDefault();
               document.getElementById('logout-form').submit();"
            >
                Вийти
            </a>

            <form id="logout-form" action="{{ route('logout') }}" method="POST" class="d-none">
                @csrf
            </form>
        </div>
    @endif
</body>
<script src="https://cdn.ckeditor.com/ckeditor5/40.2.0/classic/ckeditor.js"></script>
<script src="{{asset('js/user/article.js')}}"></script>
<script src="{{asset('js/user/homescripts.js')}}"></script>
</html>
