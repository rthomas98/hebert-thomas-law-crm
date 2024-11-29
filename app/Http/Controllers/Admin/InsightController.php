<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Insight;
use Illuminate\Http\Request;
use Inertia\Inertia;

class InsightController extends Controller
{
    public function index()
    {
        $insights = Insight::latest()->paginate(10);
        return Inertia::render('Admin/Insights/Index', [
            'insights' => $insights
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Insights/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'excerpt' => 'required|string',
            'category' => 'required|string',
            'tags' => 'nullable|array',
            'author_id' => 'required|exists:users,id',
            'is_featured' => 'boolean',
            'is_published' => 'boolean',
            'published_at' => 'nullable|date',
        ]);

        $validated['author_id'] = auth()->id();
        Insight::create($validated);

        return redirect()->route('admin.insights.index')
            ->with('success', 'Insight created successfully.');
    }

    public function edit(Insight $insight)
    {
        return Inertia::render('Admin/Insights/Edit', [
            'insight' => $insight
        ]);
    }

    public function update(Request $request, Insight $insight)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'excerpt' => 'required|string',
            'category' => 'required|string',
            'tags' => 'nullable|array',
            'is_featured' => 'boolean',
            'is_published' => 'boolean',
            'published_at' => 'nullable|date',
        ]);

        $insight->update($validated);

        return redirect()->route('admin.insights.index')
            ->with('success', 'Insight updated successfully.');
    }

    public function show(Insight $insight)
    {
        return Inertia::render('Admin/Insights/Show', [
            'insight' => $insight->load('author')
        ]);
    }

    public function destroy(Insight $insight)
    {
        $insight->delete();

        return redirect()->route('admin.insights.index')
            ->with('success', 'Insight deleted successfully.');
    }
}
