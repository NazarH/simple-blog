@extends('layouts.form')
@section('content')
    <div class="center title">
        Форма для входу
    </div>
    <form method="POST" action="{{ route('auth.index') }}" class="loginForm">
        @csrf
        <div class="row mb-3">
            <div class="auth-block">
                <input
                    id="email"
                    type="email"
                    class="form-control @error('email') is-invalid @enderror inputForm"
                    name="email" value="{{ old('email') }}"
                    required
                    autocomplete="email"
                    autofocus
                    placeholder="example@gmail.com"
                >
            </div>
            @error('email')
                <span class="invalid-feedback" role="alert">
                    <strong>{{ $message }}</strong>
                </span>
            @enderror
        </div>

        <div class="row mb-3">
            <div class="auth-block">
                <input
                    id="password"
                    type="password"
                    class="form-control @error('password') is-invalid @enderror inputForm"
                    name="password"
                    required
                    autocomplete="current-password"
                    placeholder="password"
                >
            </div>
            @error('password')
                <span class="invalid-feedback" role="alert">
                    <strong>{{ $message }}</strong>
                </span>
            @enderror
        </div>
        <div class="row mb-0">
            <div class="col-md-8">
                <button type="submit" class="btn btn-primary auth-btn">
                    Вхід
                </button>
            </div>
        </div>
    </form>
    <a href="{{route('password.index')}}" class="pass-memb">Забули пароль?</a>
    
    @if(session('status'))
        <div class="center mail-send">Пароль успішно змінено</div>
    @endif
@endsection
