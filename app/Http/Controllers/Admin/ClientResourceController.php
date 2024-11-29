<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ClientResource;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ClientResourceController extends Controller
{
    public function index()
    {
        $resources = ClientResource::latest()->paginate(10);
        return Inertia::render('Admin/ClientResources/Index', [
            'resources' => $resources
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/ClientResources/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'type' => 'required|string',
            'category' => 'required|string',
            'file_path' => 'nullable|string',
            'download_url' => 'nullable|url',
            'is_featured' => 'boolean',
            'is_published' => 'boolean',
            'access_level' => 'required|string',
        ]);

        ClientResource::create($validated);

        return redirect()->route('admin.client-resources.index')
            ->with('success', 'Client resource created successfully.');
    }

    public function edit(ClientResource $clientResource)
    {
        return Inertia::render('Admin/ClientResources/Edit', [
            'resource' => $clientResource
        ]);
    }

    public function update(Request $request, ClientResource $clientResource)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'type' => 'required|string',
            'category' => 'required|string',
            'file_path' => 'nullable|string',
            'download_url' => 'nullable|url',
            'is_featured' => 'boolean',
            'is_published' => 'boolean',
            'access_level' => 'required|string',
        ]);

        $clientResource->update($validated);

        return redirect()->route('admin.client-resources.index')
            ->with('success', 'Client resource updated successfully.');
    }

    public function destroy(ClientResource $clientResource)
    {
        $clientResource->delete();

        return redirect()->route('admin.client-resources.index')
            ->with('success', 'Client resource deleted successfully.');
    }
}
