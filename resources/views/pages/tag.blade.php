@extends('layouts.front')
@section('content')
    <div class="rubric">
        #{{ $tag?->name }}
    </div>
    <div class="content">
        @if ($rubrics)
            <ul class="nav">
                <div class="nav__title">Категорії</div>
                @foreach ($rubrics as $rubric)
                    <li class="nav__item">
                        <a href="{{route('pages.rubric', $rubric['id'])}}">{{$rubric['name']}}</a>
                    </li>
                @endforeach
            </ul>
        @endif
        <div class="content__block">
            @foreach ($articles as $article)
                @if ($article->is_active === 1)
                    <x-front.article :article='$article' />
                @endif
            @endforeach
            <div class=paginate>
                {{$articles->links()}}
            </div>
        </div>
    </div>
    <div class="footer">

    </div>
@endsection
