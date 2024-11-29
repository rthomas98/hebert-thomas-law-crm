<?php

namespace App\Http\Controllers\Admin;

use App\Models\LegalnarSeries;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;

class LegalnarSeriesController extends AdminController
{
    public function index()
    {
        $series = LegalnarSeries::with(['legalnars', 'instructor'])
            ->latest()
            ->paginate(10);

        return $this->renderView('LegalnarSeries/Index', [
            'series' => $series
        ]);
    }

    public function create()
    {
        return $this->renderView('LegalnarSeries/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'learning_outcomes' => 'nullable|array',
            'level' => 'required|string',
            'category' => 'required|string',
            'topics' => 'nullable|array',
            'price' => 'required|numeric',
            'is_featured' => 'boolean',
            'is_published' => 'boolean',
            'image' => 'nullable|image|max:2048',
        ]);

        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('series', 'public');
            $validated['image'] = Storage::url($path);
        }

        $validated['slug'] = Str::slug($validated['title']);
        $validated['instructor_id'] = auth()->id();

        $series = LegalnarSeries::create($validated);

        return $this->success('Legalnar series created successfully', $series);
    }

    public function edit(LegalnarSeries $series)
    {
        return $this->renderView('LegalnarSeries/Edit', [
            'series' => $series
        ]);
    }

    public function update(Request $request, LegalnarSeries $series)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'learning_outcomes' => 'nullable|array',
            'level' => 'required|string',
            'category' => 'required|string',
            'topics' => 'nullable|array',
            'price' => 'required|numeric',
            'is_featured' => 'boolean',
            'is_published' => 'boolean',
            'image' => 'nullable|image|max:2048',
        ]);

        if ($request->hasFile('image')) {
            // Delete old image if it exists
            if ($series->image) {
                Storage::disk('public')->delete(str_replace('/storage/', '', $series->image));
            }
            $path = $request->file('image')->store('series', 'public');
            $validated['image'] = Storage::url($path);
        }

        $validated['slug'] = Str::slug($validated['title']);
        
        $series->update($validated);

        return $this->success('Legalnar series updated successfully', $series);
    }

    public function destroy(LegalnarSeries $series)
    {
        // Delete the series image if it exists
        if ($series->image) {
            Storage::disk('public')->delete(str_replace('/storage/', '', $series->image));
        }

        $series->delete();

        return $this->success('Legalnar series deleted successfully');
    }
}
