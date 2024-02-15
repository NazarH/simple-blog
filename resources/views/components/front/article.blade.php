<div class="card mb-3" style="width: 26.8rem; height: 23rem;">
    @php
        if(preg_match('/<img[^>]+src="([^">]+)"/', $article->text, $matches))
            $link = $matches[1];
        else
            $link = '';
    @endphp
    <img src="{{$link}}" class="card-img-top" style="width: 26.7rem; height: 16rem;">
    <div class="card-body">
        <a href="{{route('pages.article', $article->id)}}" class="card-title">{{ $article->title }}</a>

        <div class="card-bottom">
            <small class="text-body-secondary">{{ \Carbon\Carbon::parse($article->created_at)->format('Y.m.d - H:i') }}</small>
            <a href="{{route('pages.article', $article->id)}}">
                Читати далі...
            </a>
        </div>
    </div>
</div>

