<div class="card mb-3 card-atr">
    <img src="{{boolval($article->image?->image_url) ? $article->image?->image_url : asset("img/noimage.png")}}" class="card-img-top img-atr">
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

