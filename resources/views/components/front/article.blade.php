<div class="item">
    <div class="item__top">
        <div class="item__title">
            <a href="{{route('pages.article', $article->id)}}">{{ $article->title }}</a>
        </div>
        <div class="item__title-bottom">
            <div class="item__author">
                {{$article->user->login}}
            </div>
            <div class="item__hr">|</div>
            <div class="item__bottom">
                {{ str_replace(' ', ' - ', str_replace('-','.', substr($article->created_at, 0, -3))) }}
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
    <div class="item__text">
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
        <a href="{{route('pages.article', $article->id)}}">Читати далі...</a>
    </div>
</div>
