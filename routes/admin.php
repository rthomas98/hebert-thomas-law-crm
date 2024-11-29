<?php

use App\Http\Controllers\Admin\LegalnarController;
use App\Http\Controllers\Admin\LegalnarSeriesController;
use App\Http\Controllers\Admin\CaseResultController;
use App\Http\Controllers\Admin\InsightController;
use App\Http\Controllers\Admin\ClientResourceController;
use App\Http\Controllers\Admin\BulkActionController;
use App\Http\Controllers\Admin\MediaLibraryController;
use App\Http\Controllers\Admin\SEOController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Admin dashboard
Route::get('/', function () {
    return Inertia::render('Admin/Dashboard');
})->name('dashboard');

// Bulk Actions
Route::post('bulk/delete', [BulkActionController::class, 'delete'])->name('bulk.delete');
Route::post('bulk/status', [BulkActionController::class, 'updateStatus'])->name('bulk.status');
Route::post('bulk/category', [BulkActionController::class, 'updateCategory'])->name('bulk.category');

// Media Library
Route::resource('media', MediaLibraryController::class)->except(['create', 'edit']);

// SEO
Route::post('seo', [SEOController::class, 'store'])->name('seo.store');
Route::get('seo/{type}/{id}', [SEOController::class, 'show'])->name('seo.show');

// Legalnar routes
Route::resource('legalnars', LegalnarController::class)->names([
    'index' => 'legalnars.index',
    'create' => 'legalnars.create',
    'store' => 'legalnars.store',
    'show' => 'legalnars.show',
    'edit' => 'legalnars.edit',
    'update' => 'legalnars.update',
    'destroy' => 'legalnars.destroy',
]);

// Legalnar series routes
Route::resource('legalnar-series', LegalnarSeriesController::class)->names([
    'index' => 'legalnar-series.index',
    'create' => 'legalnar-series.create',
    'store' => 'legalnar-series.store',
    'show' => 'legalnar-series.show',
    'edit' => 'legalnar-series.edit',
    'update' => 'legalnar-series.update',
    'destroy' => 'legalnar-series.destroy',
]);

// Case Results routes
Route::resource('case-results', CaseResultController::class)->names([
    'index' => 'case-results.index',
    'create' => 'case-results.create',
    'store' => 'case-results.store',
    'show' => 'case-results.show',
    'edit' => 'case-results.edit',
    'update' => 'case-results.update',
    'destroy' => 'case-results.destroy',
]);

// Insights routes
Route::resource('insights', InsightController::class)->names([
    'index' => 'insights.index',
    'create' => 'insights.create',
    'store' => 'insights.store',
    'show' => 'insights.show',
    'edit' => 'insights.edit',
    'update' => 'insights.update',
    'destroy' => 'insights.destroy',
]);

// Client Resources routes
Route::resource('client-resources', ClientResourceController::class)->names([
    'index' => 'client-resources.index',
    'create' => 'client-resources.create',
    'store' => 'client-resources.store',
    'show' => 'client-resources.show',
    'edit' => 'client-resources.edit',
    'update' => 'client-resources.update',
    'destroy' => 'client-resources.destroy',
]);
