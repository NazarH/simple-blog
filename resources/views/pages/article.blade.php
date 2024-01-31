@extends('layouts.front')
@section('content')
    <div class="article">
        <div class="article__top">
            <div class="article__title">
                <a href="javascript:void(0);" onclick="window.location.href = document.referrer;">На попередню</a>
                <
                <a href="{{route('pages.article', $article->id)}}">{{$article->title}}</a>
            </div>
            <div class="article__title-bottom">
                <div class="article__author">
                    {{$article->user->login}}
                </div>
                <div class="article__hr">|</div>
                <div class="article__bottom">
                    {{str_replace(' ', ' - ', str_replace('-','.', substr($article->created_at, 0, -3)))}}
                </div>
                <div class="item__hr-2">|</div>
                <div class="item__rubrics">
                    @foreach ($article->rubrics as $rubric)
                        @if ($rubric->is_active === 1)
                            <div>
                                <a href="{{route('pages.rubric', $rubric['id'])}}">{{$rubric['name']}}</a>
                            </div>
                        @endif
                    @endforeach
                </div>
            </div>
        </div>
        <div class="article__text">
            <pre>@php echo $article->text;@endphp</pre>
        </div>
        <div class="item__read">
            <div class="item_tags">
                <div>
                    Теги:
                </div>
                @foreach ($article->tags as $tag)
                    @if ($tag->is_active === 1)
                        <div class="item__tag">
                            <a href="{{route('pages.tag', $tag['id'])}}">{{{$tag->name}}}</a>
                        </div>
                    @endif
                @endforeach
            </div>
        </div>
        <div class="article__comments">
            @if (Auth::user())
                <form action="{{route('pages.comment', $article->id)}}" class="article__form" method="POST">
                    @csrf
                    <div>
                        <span class="form__text-btn" title="Жирний текст: <b>текст</b>" onclick='addFormat("<b></b>")'>
                            B
                        </span>

                        <span class="form__text-btn tilted" title="Нахилений текст: <i>текст</i>" onclick='addFormat("<i></i>")'>
                            I
                        </span>

                        <span class="form__text-btn emphatic" title="Підкреслений текст: <u>текст</u>" onclick='addFormat("<u></u>")'>
                            U
                        </span>

                        <span class="form__text-btn" title="Цитата: <q>текст</q>" onclick='addFormat("<blockquote></blockquote>")'>
                            Q
                        </span>

                        <span class="form__text-btn" title="Перекреслений: <s>текст</s>" onclick='addFormat("<s></s>")'>
                            S
                        </span>
                    </div>
                    <textarea cols="30" rows="6" id='textArea' name="text"></textarea>
                    <div class="article__form-emo">
                        <div onclick='addEmote("🙂")'>
                            🙂
                        </div>
                        <div onclick='addEmote("🙁")'>
                            🙁
                        </div>
                        <div onclick='addEmote("😟")'>
                            😟
                        </div>
                        <div onclick='addEmote("😉")'>
                            😉
                        </div>
                        <div onclick='addEmote("😐")'>
                            😐
                        </div>
                        <div onclick='addEmote("😁")'>
                            😁
                        </div>
                        <div onclick='addEmote("😎")'>
                            😎
                        </div>
                        <div onclick='addEmote("😲")'>
                            😲
                        </div>
                        <div onclick='addEmote("🙄")'>
                            🙄
                        </div>
                        <div onclick='addEmote("😭")'>
                            😭
                        </div>
                        <div onclick='addEmote("🤔")'>
                            🤔
                        </div>
                        <div onclick='addEmote("🤨")'>
                            🤨
                        </div>
                        <div onclick='addEmote("😆")'>
                            😆
                        </div>
                        <div onclick='addEmote("🤬")'>
                            🤬
                        </div>
                        <div onclick='addEmote("🤢")'>
                            🤢
                        </div>
                        <div onclick='addEmote("🤡")'>
                            🤡
                        </div>
                        <div onclick='addEmote("👍")'>
                            👍
                        </div>
                        <div onclick='addEmote("👎")'>
                            👎
                        </div>
                    </div>
                    <button type="submit">
                        Відправити
                    </button>
                </form>
            @else
                <div class="article__comment-login">
                    <a href="/login">Авторизуйтесь</a>, щоб залишити коментар
                </div>
            @endif
            <div class="article__comments-title">
                Коментарі:
            </div>
            <div class="article__comments-block">
                @foreach ($comments as $comment)
                    <x-front.comment :comment='$comment' />
                @endforeach
            </div>
            <div class='article__paginate'>
                {{$comments->links()}}
            </div>
        </div>
    </div>
@endsection

