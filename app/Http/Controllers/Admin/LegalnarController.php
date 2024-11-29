<?php

namespace App\Http\Controllers\Admin;

use App\Models\Legalnar;
use App\Models\LegalnarSeries;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class LegalnarController extends Controller
{
    public function index()
    {
        $legalnars = Legalnar::with(['series', 'instructor'])
            ->latest()
            ->paginate(10);

        return Inertia::render('Admin/Legalnars/Index', [
            'legalnars' => $legalnars
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Legalnars/Create', [
            'series' => LegalnarSeries::all()
        ]);
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
            'video_url' => 'nullable|url',
            'meeting_url' => 'nullable|url',
            'scheduled_time' => 'required|date',
            'duration' => 'required|integer',
            'price' => 'required|numeric',
            'is_featured' => 'boolean',
            'is_published' => 'boolean',
            'is_live' => 'boolean',
            'resources' => 'nullable|array',
            'featured_image' => 'nullable|image|max:2048',
            'additional_images.*' => 'nullable|image|max:2048',
            'series_id' => 'nullable|exists:legalnar_series,id',
            'session_number' => [
                'nullable',
                'integer',
                Rule::unique('legalnars')
                    ->where(function ($query) use ($request) {
                        return $query->where('series_id', $request->series_id);
                    })
            ],
        ]);

        // Handle featured image upload
        if ($request->hasFile('featured_image')) {
            $path = $request->file('featured_image')->store('legalnars/featured', 'public');
            $validated['featured_image'] = Storage::url($path);
        }

        // Handle additional images upload
        if ($request->hasFile('additional_images')) {
            $additionalImages = [];
            foreach ($request->file('additional_images') as $image) {
                $path = $image->store('legalnars/additional', 'public');
                $additionalImages[] = Storage::url($path);
            }
            $validated['additional_images'] = $additionalImages;
        }

        $legalnar = Legalnar::create($validated);

        return redirect()->route('admin.legalnars.index')
            ->with('message', 'Legalnar created successfully.');
    }

    public function show(Legalnar $legalnar)
    {
        return Inertia::render('Admin/Legalnars/Show', [
            'legalnar' => $legalnar->load(['series', 'instructor'])
        ]);
    }

    public function edit(Legalnar $legalnar)
    {
        return Inertia::render('Admin/Legalnars/Edit', [
            'legalnar' => $legalnar->load(['series', 'instructor']),
            'series' => LegalnarSeries::all()
        ]);
    }

    public function update(Request $request, Legalnar $legalnar)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'learning_outcomes' => 'nullable|array',
            'level' => 'required|string',
            'category' => 'required|string',
            'topics' => 'nullable|array',
            'video_url' => 'nullable|url',
            'meeting_url' => 'nullable|url',
            'scheduled_time' => 'required|date',
            'duration' => 'required|integer',
            'price' => 'required|numeric',
            'is_featured' => 'boolean',
            'is_published' => 'boolean',
            'is_live' => 'boolean',
            'resources' => 'nullable|array',
            'featured_image' => 'nullable|image|max:2048',
            'additional_images.*' => 'nullable|image|max:2048',
            'series_id' => 'nullable|exists:legalnar_series,id',
            'session_number' => [
                'nullable',
                'integer',
                Rule::unique('legalnars')
                    ->where(function ($query) use ($request) {
                        return $query->where('series_id', $request->series_id);
                    })
                    ->ignore($legalnar->id)
            ],
        ]);

        // Handle featured image upload
        if ($request->hasFile('featured_image')) {
            // Delete old featured image if it exists
            if ($legalnar->featured_image) {
                Storage::disk('public')->delete(str_replace('/storage/', '', $legalnar->featured_image));
            }
            $path = $request->file('featured_image')->store('legalnars/featured', 'public');
            $validated['featured_image'] = Storage::url($path);
        }

        // Handle additional images upload
        if ($request->hasFile('additional_images')) {
            // Delete old additional images if they exist
            if ($legalnar->additional_images) {
                foreach ($legalnar->additional_images as $image) {
                    Storage::disk('public')->delete(str_replace('/storage/', '', $image));
                }
            }
            
            $additionalImages = [];
            foreach ($request->file('additional_images') as $image) {
                $path = $image->store('legalnars/additional', 'public');
                $additionalImages[] = Storage::url($path);
            }
            $validated['additional_images'] = $additionalImages;
        }

        $legalnar->update($validated);

        return redirect()->route('admin.legalnars.index')
            ->with('message', 'Legalnar updated successfully.');
    }

    public function destroy(Legalnar $legalnar)
    {
        // Delete associated images
        if ($legalnar->featured_image) {
            Storage::disk('public')->delete(str_replace('/storage/', '', $legalnar->featured_image));
        }
        
        if ($legalnar->additional_images) {
            foreach ($legalnar->additional_images as $image) {
                Storage::disk('public')->delete(str_replace('/storage/', '', $image));
            }
        }

        $legalnar->delete();

        return redirect()->route('admin.legalnars.index')
            ->with('message', 'Legalnar deleted successfully.');
    }
}
