<ul class="nav">
    @foreach ($rubrics as $rubric)
        <li class="nav__item">
            <a href="{{route('pages.rubric', $rubric['id'])}}">{{ $rubric['name'] }}</a>
        </li>
    @endforeach
</ul>
