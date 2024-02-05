@extends('layouts.front')
@section('content')
    <div class="content">
        <div class="content__block">
            <div class="content__articles">
                @foreach ($articles as $article)
                    <x-front.article :article='$article' />
                @endforeach
            </div>
            <div class="paginate">
                {{$articles->links()}}
            </div>
        </div>
    </div>
    <div class="footer">
        <div class="footer__logo">
            <a href="/">
                <span class="footer__simple">Simple</span>Blog
            </a>
        </div>
        <div class="all-rights">
            © 2023-2024 PetBlog.test
        </div>
    </div>
@endsection
