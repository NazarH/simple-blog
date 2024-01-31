@extends('layouts.front')
@section('content')
    <div class="auth-top">
        <a href="/">< Домашня</a>
    </div>
    <form method="POST" action="{{ route('login') }}" class="loginForm">
        @csrf
        <div class="row mb-3">
            <div class="auth-block">
                <div>
                    Емейл
                </div>
                <input id="email" type="email" class="form-control @error('email') is-invalid @enderror" name="email" value="{{ old('email') }}" required autocomplete="email" autofocus>
            </div>
            @error('email')
                <span class="invalid-feedback" role="alert">
                    <strong>{{ $message }}</strong>
                </span>
            @enderror
        </div>

        <div class="row mb-3">
            <div class="auth-block">
                <div>
                    Пароль
                </div>
                <input id="password" type="password" class="form-control @error('password') is-invalid @enderror" name="password" required autocomplete="current-password">
            </div>
            @error('password')
                <span class="invalid-feedback" role="alert">
                    <strong>{{ $message }}</strong>
                </span>
            @enderror
        </div>
        <div class="row mb-0">
            <div class="col-md-8 offset-md-4">
                <button type="submit" class="btn btn-primary">
                    Вхід
                </button>
            </div>
        </div>
    </form>

@endsection
