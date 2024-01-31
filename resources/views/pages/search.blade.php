@extends('layouts.front')
@section('content')
    <div class="rubric">
        «{{$title}}»
    </div>
    <div class="content2">
        <div class="content__block">
            @foreach ($articles->items() as $article)
                <x-front.article :article='$article' />
            @endforeach
            <div class=paginate>
                {{ $articles->links() }}
            </div>
        </div>
    </div>
    <div class="footer">

    </div>
@endsection
