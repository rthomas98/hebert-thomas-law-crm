<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Intervention\Image\Facades\Image;
use App\Models\Media;

class MediaLibraryController extends Controller
{
    public function index()
    {
        $images = Media::latest()->paginate(24);
        return inertia('Admin/Media/Index', [
            'images' => $images
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'images.*' => 'required|image|max:10240', // 10MB max
        ]);

        $savedImages = [];

        foreach ($request->file('images') as $image) {
            // Generate a unique filename
            $filename = Str::uuid() . '.' . $image->getClientOriginalExtension();
            
            // Create image variations
            $variations = $this->createImageVariations($image, $filename);
            
            // Save media record
            $media = Media::create([
                'filename' => $filename,
                'original_name' => $image->getClientOriginalName(),
                'mime_type' => $image->getMimeType(),
                'size' => $image->getSize(),
                'variations' => $variations,
            ]);

            $savedImages[] = $media;
        }

        return back()->with('success', 'Images uploaded successfully');
    }

    protected function createImageVariations($image, $filename)
    {
        $variations = [];
        $sizes = [
            'thumbnail' => [150, 150],
            'small' => [300, 300],
            'medium' => [600, 600],
            'large' => [1200, 1200]
        ];

        // Save original
        $image->storeAs('public/media/original', $filename);
        $variations['original'] = Storage::url('media/original/' . $filename);

        // Create variations
        foreach ($sizes as $size => [$width, $height]) {
            $img = Image::make($image);
            $img->fit($width, $height, function ($constraint) {
                $constraint->aspectRatio();
                $constraint->upsize();
            });

            $path = "public/media/{$size}/{$filename}";
            Storage::put($path, $img->encode());
            
            $variations[$size] = Storage::url("media/{$size}/{$filename}");
        }

        return $variations;
    }

    public function destroy($id)
    {
        $media = Media::findOrFail($id);
        
        // Delete all variations
        foreach ($media->variations as $size => $path) {
            $relativePath = str_replace('/storage/', '', $path);
            Storage::delete('public/' . $relativePath);
        }

        $media->delete();

        return back()->with('success', 'Image deleted successfully');
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'alt_text' => 'nullable|string|max:255',
            'title' => 'nullable|string|max:255',
            'caption' => 'nullable|string|max:1000',
        ]);

        $media = Media::findOrFail($id);
        $media->update($request->only(['alt_text', 'title', 'caption']));

        return back()->with('success', 'Image updated successfully');
    }
}
