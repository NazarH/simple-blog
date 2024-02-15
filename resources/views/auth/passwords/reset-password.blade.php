@extends('layouts.front')
@section('content')
    <div class="center title">
        Встановіть новий пароль
    </div>
    <form method="POST" action="{{ route('password.update') }}" class="loginForm">
        @csrf
        <input type="hidden" name="token" value="{{ $request->token }}">
        <div class="row mb-3">
            <div class="auth-block">
                <input
                    id="email"
                    type="email"
                    class="form-control @error('email') is-invalid @enderror inputForm"
                    name="email" value="{{ old('email', $request->email) }}"
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
        <div class="row mb-3">
            <div class="auth-block">
                <input
                    id="password_confirmation"
                    type="password"
                    class="form-control @error('password_confirmation') is-invalid @enderror inputForm"
                    name="password_confirmation"
                    required
                    autocomplete="current-password"
                    placeholder="password confirmation"
                >
            </div>
            @error('password_confirmation')
            <span class="invalid-feedback" role="alert">
                    <strong>{{ $message }}</strong>
                </span>
            @enderror
        </div>
        <div class="row mb-0">
            <div class="col-md-8">
                <button type="submit" class="btn btn-primary auth-btn">
                    Встановити
                </button>
            </div>
        </div>

    </form>
@endsection
