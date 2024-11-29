<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminController extends Controller
{
    public function __construct()
    {
        // Remove this since we're already handling it in the route group
        // $this->middleware(['auth', 'role:admin']);
    }

    protected function renderView($component, $props = [])
    {
        return Inertia::render("Admin/{$component}", array_merge([
            'pageTitle' => $this->getPageTitle($component),
        ], $props));
    }

    protected function getPageTitle($component)
    {
        return str_replace('_', ' ', $component);
    }

    protected function success($message, $data = null)
    {
        return response()->json([
            'success' => true,
            'message' => $message,
            'data' => $data,
        ]);
    }

    protected function error($message, $code = 400)
    {
        return response()->json([
            'success' => false,
            'message' => $message,
        ], $code);
    }
}
