<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\SEOMetadata;

class SEOController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'model_type' => 'required|string',
            'model_id' => 'required|integer',
            'meta_title' => 'nullable|string|max:60',
            'meta_description' => 'nullable|string|max:160',
            'meta_keywords' => 'nullable|array',
            'meta_keywords.*' => 'string',
            'og_title' => 'nullable|string|max:60',
            'og_description' => 'nullable|string|max:160',
            'og_image' => 'nullable|string',
            'canonical_url' => 'nullable|string|url',
        ]);

        $seo = SEOMetadata::updateOrCreate(
            [
                'model_type' => $request->model_type,
                'model_id' => $request->model_id,
            ],
            [
                'meta_title' => $request->meta_title,
                'meta_description' => $request->meta_description,
                'meta_keywords' => $request->meta_keywords,
                'og_title' => $request->og_title,
                'og_description' => $request->og_description,
                'og_image' => $request->og_image,
                'canonical_url' => $request->canonical_url,
            ]
        );

        return back()->with('success', 'SEO metadata updated successfully');
    }

    public function show($type, $id)
    {
        $seo = SEOMetadata::where('model_type', $type)
            ->where('model_id', $id)
            ->first();

        return response()->json($seo);
    }
}
