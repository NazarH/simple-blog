@extends('layouts.front')
@section('content')
    <div class="rubric">
        #{{ $tag?->name }}
    </div>
    <div class="content">
        <div class="content__block">
            <div class="content__articles">
            @foreach ($articles as $article)
                @if ($article->is_active)
                    <x-article :article='$article' />
                @endif
            @endforeach
            </div>
            <div class=paginate>
                {{$articles->links()}}
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
