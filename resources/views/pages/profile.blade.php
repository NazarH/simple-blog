@extends('layouts.front')
@section('content')
    <form action="{{route('pages.profile.edit', Auth::user()->id)}}" class="profile" method="POST">
        @csrf
        <div class="profile__item">
            <p>
                Ім'я користувача:
            </p>
            <p>
                {{Auth::user()->login}}
            </p>
        </div>
        <div class="profile__item">
            <p>
                Email:
            </p>
            <input type="text" name='email' value={{Auth::user()->email}}>
        </div>
        <div class="profile__item">
            <p>
                Новий пароль:
            </p>
            <input type="password" name='password'>
        </div>
        <div class="profile__item">
            <p>
                Повторити пароль:
            </p>
            <input type="password" name='password_confirmation'>
        </div>
        <button type="submit" class="profile_btn">
            Оновити
        </button>
    </form>
@endsection
