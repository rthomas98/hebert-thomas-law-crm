<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Legalnar;
use App\Models\Series;
use App\Constants\LegalnarConstants;

class LegalnarsController extends Controller
{
    public function index()
    {
        $legalnars = Legalnar::with('instructor')
            ->latest()
            ->paginate(10);
        
        return Inertia::render('Admin/Legalnars/Index', [
            'legalnars' => $legalnars,
            'categories' => LegalnarConstants::CATEGORIES,
            'levels' => LegalnarConstants::LEVELS
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Legalnars/Create', [
            'categories' => LegalnarConstants::CATEGORIES,
            'levels' => LegalnarConstants::LEVELS,
            'series' => Series::select('id', 'title')->get()
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'series_id' => 'nullable|exists:series,id',
            'session_number' => 'nullable|integer',
            'title' => 'required|string|max:255',
            'slug' => 'required|string|max:255|unique:legalnars',
            'description' => 'required|string',
            'what_you_will_learn' => 'nullable|string',
            'level' => 'required|string',
            'category' => 'required|string',
            'topics' => 'nullable|array',
            'thumbnail_path' => 'nullable|string',
            'video_url' => 'nullable|string',
            'meeting_url' => 'nullable|string',
            'scheduled_at' => 'nullable|date',
            'duration_minutes' => 'nullable|integer',
            'price' => 'nullable|numeric',
            'is_featured' => 'boolean',
            'is_published' => 'boolean',
            'is_live' => 'boolean',
            'published_at' => 'nullable|date',
            'resources' => 'nullable|array',
            'instructor_id' => 'nullable|exists:users,id',
            'featured_image' => 'nullable|string',
            'additional_images' => 'nullable|array'
        ]);

        $legalnar = Legalnar::create($validated);

        return redirect()->route('admin.legalnars.edit', $legalnar)
            ->with('success', 'Legalnar created successfully.');
    }

    public function edit(Legalnar $legalnar)
    {
        return Inertia::render('Admin/Legalnars/Edit', [
            'legalnar' => $legalnar->load('instructor'),
            'categories' => LegalnarConstants::CATEGORIES,
            'levels' => LegalnarConstants::LEVELS
        ]);
    }

    public function update(Request $request, Legalnar $legalnar)
    {
        $validated = $request->validate([
            'series_id' => 'nullable|exists:series,id',
            'session_number' => 'nullable|integer',
            'title' => 'required|string|max:255',
            'slug' => 'required|string|max:255|unique:legalnars,slug,' . $legalnar->id,
            'description' => 'required|string',
            'what_you_will_learn' => 'nullable|string',
            'level' => 'required|string',
            'category' => 'required|string',
            'topics' => 'nullable|array',
            'thumbnail_path' => 'nullable|string',
            'video_url' => 'nullable|string',
            'meeting_url' => 'nullable|string',
            'scheduled_at' => 'nullable|date',
            'duration_minutes' => 'nullable|integer',
            'price' => 'nullable|numeric',
            'is_featured' => 'boolean',
            'is_published' => 'boolean',
            'is_live' => 'boolean',
            'published_at' => 'nullable|date',
            'resources' => 'nullable|array',
            'instructor_id' => 'nullable|exists:users,id',
            'featured_image' => 'nullable|string',
            'additional_images' => 'nullable|array'
        ]);

        $legalnar->update($validated);

        return redirect()->back()
            ->with('success', 'Legalnar updated successfully.');
    }

    public function show(Legalnar $legalnar)
    {
        return Inertia::render('Admin/Legalnars/Show', [
            'legalnar' => $legalnar->load('instructor')
        ]);
    }

    public function destroy(Legalnar $legalnar)
    {
        $legalnar->delete();

        return redirect()->route('admin.legalnars.index')
            ->with('success', 'Legalnar deleted successfully.');
    }
}
