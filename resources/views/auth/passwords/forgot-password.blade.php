@extends('layouts.form')
@section('content')
    <div class="center title">
        Форма для відновлення паролю
    </div>
    <form method="POST" action="{{ route('password.request') }}" class="loginForm">
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
        <div class="row mb-0">
            <div>
                <button type="submit" class="auth-btn">
                    Send Reset Link
                </button>
            </div>
        </div>
    </form>
    @if(session('status'))
        <div class="center mail-send">Лист для відновлення було надіслано</div>
    @endif
@endsection

