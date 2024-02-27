@extends('layouts.front')
@section('content')
    <div class="rubric">
        «{{$title}}»
    </div>
    <div class="content2">
        <div class="content__block">
            @foreach ($articles->items() as $article)
                <x-article :article='$article' />
            @endforeach
            <div class=paginate>
                {{ $articles->links() }}
            </div>
        </div>
    </div>
    <div class="footer">
        <div class="footer__logo">
        </div>
        <div class="all-rights">
            © 2023-2024 PetBlog.test
        </div>
    </div>
@endsection
