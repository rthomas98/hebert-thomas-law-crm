<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Intervention\Image\Facades\Image;
use Inertia\Inertia;

class MediaController extends Controller
{
    public function index()
    {
        $files = Storage::disk('public')->files('media');
        $media = collect($files)->map(function ($file) {
            return [
                'id' => $file,
                'name' => basename($file),
                'url' => Storage::disk('public')->url($file),
                'size' => Storage::disk('public')->size($file),
                'created_at' => Storage::disk('public')->lastModified($file),
            ];
        })->sortByDesc('created_at')->values();

        return response()->json([
            'media' => $media
        ]);
    }

    public function upload(Request $request)
    {
        $request->validate([
            'file' => 'required|file|mimes:jpeg,png,jpg,gif,pdf,doc,docx|max:10240'
        ]);

        $file = $request->file('file');
        $filename = time() . '_' . $file->getClientOriginalName();
        $path = $file->storeAs('media', $filename, 'public');

        // If it's an image, create a thumbnail
        if (in_array($file->getClientMimeType(), ['image/jpeg', 'image/png', 'image/gif'])) {
            $image = Image::make($file);
            
            // Resize if larger than 2000px
            if ($image->width() > 2000) {
                $image->resize(2000, null, function ($constraint) {
                    $constraint->aspectRatio();
                    $constraint->upsize();
                });
            }

            // Create thumbnail
            $thumbnail = Image::make($file);
            $thumbnail->fit(300, 300);
            Storage::disk('public')->put(
                'media/thumbnails/' . $filename,
                $thumbnail->encode()
            );

            $image->save(storage_path('app/public/' . $path));
        }

        return response()->json([
            'location' => Storage::disk('public')->url($path)
        ]);
    }

    public function destroy($media)
    {
        $path = 'media/' . basename($media);
        $thumbnailPath = 'media/thumbnails/' . basename($media);

        if (Storage::disk('public')->exists($path)) {
            Storage::disk('public')->delete($path);
        }

        if (Storage::disk('public')->exists($thumbnailPath)) {
            Storage::disk('public')->delete($thumbnailPath);
        }

        return response()->json(['success' => true]);
    }
}
