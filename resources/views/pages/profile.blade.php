@extends('layouts.front')
@section('content')
    <form action="{{route('pages.profile.edit', Auth::user()->id)}}" class="profile" method="POST">
        @csrf
        <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label user-title">{{Auth::user()->login}}</label>
        </div>
        <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label">Email address</label>
            <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value="{{Auth::user()->email}}">
        </div>
        <div class="mb-3">
            <label for="exampleInputPassword1" class="form-label">Новий пароль:</label>
            <input type="password" class="form-control" id="exampleInputPassword1">
        </div>
        <div class="mb-3">
            <label for="exampleInputPassword1" class="form-label">Повторити пароль:</label>
            <input name='password_confirmation' type="password" class="form-control" id="exampleInputPassword1">
        </div>
        <button type="submit" class="btn btn-primary">Оновити</button>
    </form>
@endsection
