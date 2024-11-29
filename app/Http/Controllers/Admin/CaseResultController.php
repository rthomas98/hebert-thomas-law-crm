<?php

namespace App\Http\Controllers\Admin;

use App\Models\CaseResult;
use App\Http\Controllers\Controller;
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

    public function show(CaseResult $caseResult)
    {
        return Inertia::render('Admin/CaseResults/Show', [
            'caseResult' => $caseResult
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
            'case_type' => 'required|string|max:255',
            'description' => 'required|string',
            'amount' => 'nullable|numeric',
            'outcome' => 'required|string',
            'date_resolved' => 'nullable|date',
            'client_testimonial' => 'nullable|string',
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
            'case_type' => 'required|string|max:255',
            'description' => 'required|string',
            'amount' => 'nullable|numeric',
            'outcome' => 'required|string',
            'date_resolved' => 'nullable|date',
            'client_testimonial' => 'nullable|string',
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
