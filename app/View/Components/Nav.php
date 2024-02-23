<?php

namespace App\View\Components;

use App\Models\Rubric;
use Illuminate\Contracts\View\View;
use Illuminate\View\Component;

class Nav extends Component
{
    public $rubrics;

    /**
     * Create a new component instance.
     */
    public function __construct()
    {
        $this->rubrics = Rubric::active()->inRandomOrder()->take(10)->get();
    }

    /**
     * Get the view / contents that represent the component.
     */
    public function render(): View
    {
        return view('components.nav', ['rubrics' => $this->rubrics]);
    }
}
