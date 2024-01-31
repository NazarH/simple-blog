@extends('layouts.front')
@section('content')
    <div class="content">
        <ul class="nav">
            <div class="nav__title">Категорії</div>
            @foreach ($rubrics as $rubric)
                <li class="nav__item">
                    <a href="{{route('pages.rubric', $rubric['id'])}}">{{ $rubric['name'] }}</a>
                </li>
            @endforeach
        </ul>
        <div class="content__block">
            @foreach ($articles as $article)
                <x-front.article :article='$article' />
            @endforeach
            <div class=paginate>
                {{$articles->links()}}
            </div>
        </div>
    </div>
    <div class="footer">

    </div>
@endsection
