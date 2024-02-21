@extends('layouts.front')
@section('content')
    <div class="article">
        <div class="article__top">
            <div class="article__title">
                <a href="{{route('pages.article', $article->id)}}">{{$article->title}}</a>
            </div>
            <div class="article__title-bottom">
                <div class="article__author">
                    {{$article->user->login}}
                </div>
                <div class="article__hr">|</div>
                <div class="article__bottom">
                    {{ \Carbon\Carbon::parse($article->created_at)->format('Y.m.d - H:i') }}
                </div>
                <div class="item__hr-2">|</div>
                <div class="item__rubrics">
                    @foreach ($article->rubrics as $rubric)
                        @if ($rubric->is_active === 1)
                            <div>
                                <a href="{{route('pages.rubric', $rubric['id'])}}">
                                    {{$rubric['name']}}
                                </a>
                            </div>
                        @endif
                    @endforeach
                </div>
            </div>
        </div>
        <div class="article__text">
            {!!$article->text!!}
        </div>
        <div class="item__read">
            <div class="item_tags">
                <div>
                    Теги:
                </div>
                @foreach ($article->tags as $tag)
                    @if ($tag->is_active)
                        <div class="item__tag">
                            <a href="{{route('pages.tag', $tag['id'])}}">
                                {{{$tag->name}}}
                            </a>
                        </div>
                    @endif
                @endforeach
            </div>
        </div>
        <div class="article__comments">
            @if (Auth::user())
                <div id="disqus_thread"></div>
                <script>
                    var disqus_config = function () {
                        this.page.identifier = "{{ $article->id }}";
                    };

                    (function() { // DON'T EDIT BELOW THIS LINE
                        var d = document, s = d.createElement('script');
                        s.src = 'https://pet-blog.disqus.com/embed.js';
                        s.setAttribute('data-timestamp', +new Date());
                        (d.head || d.body).appendChild(s);
                    })();
                </script>
                <noscript>Please enable JavaScript to view the <a href="https://disqus.com/?ref_noscript">comments powered by Disqus.</a></noscript>
            @else
                <div class="article__comment-login">
                    <a href="/login">Авторизуйтесь</a>, щоб залишити коментар
                </div>
            @endif
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

