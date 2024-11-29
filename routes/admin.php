<?php

use App\Http\Controllers\Admin\LegalnarController;
use App\Http\Controllers\Admin\LegalnarSeriesController;
use App\Http\Controllers\Admin\CaseResultController;
use App\Http\Controllers\Admin\InsightController;
use App\Http\Controllers\Admin\ClientResourceController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Admin dashboard
Route::get('/', function () {
    return Inertia::render('Admin/Dashboard');
})->name('admin.dashboard');

// Legalnar routes
Route::resource('legalnars', LegalnarController::class)->names([
    'index' => 'admin.legalnars.index',
    'create' => 'admin.legalnars.create',
    'store' => 'admin.legalnars.store',
    'show' => 'admin.legalnars.show',
    'edit' => 'admin.legalnars.edit',
    'update' => 'admin.legalnars.update',
    'destroy' => 'admin.legalnars.destroy',
]);

// Legalnar series routes
Route::resource('legalnar-series', LegalnarSeriesController::class)->names([
    'index' => 'admin.legalnar-series.index',
    'create' => 'admin.legalnar-series.create',
    'store' => 'admin.legalnar-series.store',
    'show' => 'admin.legalnar-series.show',
    'edit' => 'admin.legalnar-series.edit',
    'update' => 'admin.legalnar-series.update',
    'destroy' => 'admin.legalnar-series.destroy',
]);

// Case Results routes
Route::resource('case-results', CaseResultController::class)->names([
    'index' => 'admin.case-results.index',
    'create' => 'admin.case-results.create',
    'store' => 'admin.case-results.store',
    'show' => 'admin.case-results.show',
    'edit' => 'admin.case-results.edit',
    'update' => 'admin.case-results.update',
    'destroy' => 'admin.case-results.destroy',
]);

// Insights routes
Route::resource('insights', InsightController::class)->names([
    'index' => 'admin.insights.index',
    'create' => 'admin.insights.create',
    'store' => 'admin.insights.store',
    'show' => 'admin.insights.show',
    'edit' => 'admin.insights.edit',
    'update' => 'admin.insights.update',
    'destroy' => 'admin.insights.destroy',
]);

// Client Resources routes
Route::resource('client-resources', ClientResourceController::class)->names([
    'index' => 'admin.client-resources.index',
    'create' => 'admin.client-resources.create',
    'store' => 'admin.client-resources.store',
    'show' => 'admin.client-resources.show',
    'edit' => 'admin.client-resources.edit',
    'update' => 'admin.client-resources.update',
    'destroy' => 'admin.client-resources.destroy',
]);
