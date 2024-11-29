<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\CaseResult;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CaseResultController extends Controller
{
    public function index()
    {
        $caseResults = CaseResult::latest()->paginate(10);
        return Inertia::render('Admin/CaseResults/Index', [
            'caseResults' => $caseResults
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/CaseResults/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'client_type' => 'required|string',
            'practice_area' => 'required|string',
            'outcome' => 'required|string',
            'amount' => 'nullable|numeric',
            'is_featured' => 'boolean',
            'is_published' => 'boolean',
        ]);

        CaseResult::create($validated);

        return redirect()->route('admin.case-results.index')
            ->with('success', 'Case result created successfully.');
    }

    public function edit(CaseResult $caseResult)
    {
        return Inertia::render('Admin/CaseResults/Edit', [
            'caseResult' => $caseResult
        ]);
    }

    public function update(Request $request, CaseResult $caseResult)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'client_type' => 'required|string',
            'practice_area' => 'required|string',
            'outcome' => 'required|string',
            'amount' => 'nullable|numeric',
            'is_featured' => 'boolean',
            'is_published' => 'boolean',
        ]);

        $caseResult->update($validated);

        return redirect()->route('admin.case-results.index')
            ->with('success', 'Case result updated successfully.');
    }

    public function destroy(CaseResult $caseResult)
    {
        $caseResult->delete();

        return redirect()->route('admin.case-results.index')
            ->with('success', 'Case result deleted successfully.');
    }
}
