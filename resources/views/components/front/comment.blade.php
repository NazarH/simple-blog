<div class="comment">
    <div class="comment__user">
        <div class="comment__nickname">
            <div>
                {{$comment->user->login}}
            </div>
            @if (!$comment->user->is_active)
                <div class="ban">
                    ban
                </div>
            @endif
        </div>

        <div class="comment__btns">
            <div class="comment__answer" onclick="addAnswer('<b>{{$comment->user->login}}</b>')">
                {{
                    Auth::user() && (Auth::user()->id !== $comment->user->id) ? '[відповісти]' : ''
                }}
            </div>
        </div>
    </div>
    <div class="comment__text">
        {{$comment->text}}
    </div>
</div>
