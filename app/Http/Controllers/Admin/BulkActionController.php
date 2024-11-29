<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Legalnar;
use App\Models\LegalnarSeries;
use App\Models\Insight;
use App\Models\CaseResult;
use App\Models\ClientResource;

class BulkActionController extends Controller
{
    protected $modelMap = [
        'legalnars' => Legalnar::class,
        'legalnar-series' => LegalnarSeries::class,
        'insights' => Insight::class,
        'case-results' => CaseResult::class,
        'client-resources' => ClientResource::class,
    ];

    public function delete(Request $request)
    {
        $request->validate([
            'ids' => 'required|array',
            'ids.*' => 'required|integer',
            'type' => 'required|string|in:legalnars,legalnar-series,insights,case-results,client-resources',
        ]);

        $model = $this->modelMap[$request->type];
        $model::whereIn('id', $request->ids)->delete();

        return back()->with('success', 'Items deleted successfully');
    }

    public function updateStatus(Request $request)
    {
        $request->validate([
            'ids' => 'required|array',
            'ids.*' => 'required|integer',
            'type' => 'required|string|in:legalnars,legalnar-series,insights,case-results,client-resources',
            'status' => 'required|string|in:published,draft',
        ]);

        $model = $this->modelMap[$request->type];
        $model::whereIn('id', $request->ids)
            ->update(['is_published' => $request->status === 'published']);

        return back()->with('success', 'Status updated successfully');
    }

    public function updateCategory(Request $request)
    {
        $request->validate([
            'ids' => 'required|array',
            'ids.*' => 'required|integer',
            'type' => 'required|string|in:legalnars,legalnar-series,insights,case-results,client-resources',
            'category' => 'required|string',
        ]);

        $model = $this->modelMap[$request->type];
        $model::whereIn('id', $request->ids)
            ->update(['category' => $request->category]);

        return back()->with('success', 'Category updated successfully');
    }
}
