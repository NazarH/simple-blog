<div class="item">
    @php
        if(preg_match('/<img[^>]+src="([^">]+)"/', $article->text, $matches))
            $link = $matches[1];
        else
            $link = '';
    @endphp
    <img src="{{$link}}" class="item-img">
    <div class="item__top">
        <div class="item__title">
            <a href="{{route('pages.article', $article->id)}}">{{ $article->title }}</a>
        </div>
    </div>
    <div class="item__read">
        <div class="item__bottom">
            {{ \Carbon\Carbon::parse($article->created_at)->format('Y.m.d - H:i') }}
        </div>
        <a href="{{route('pages.article', $article->id)}}">
            Читати далі...
        </a>
    </div>
</div>
