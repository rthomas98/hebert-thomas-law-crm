<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Home');
});

Route::get('/about', function () {
    return Inertia::render('About');
});

Route::get('/contact', function () {
    return Inertia::render('Contact');
});

// Trademark Services Routes
Route::prefix('trademark')->group(function () {
    Route::get('/', function () {
        return Inertia::render('Trademark/Overview');
    })->name('trademark.overview');
    
    Route::get('/clearance-search', function () {
        return Inertia::render('Trademark/ClearanceSearch');
    })->name('trademark.clearance-search');
    
    Route::get('/registration', function () {
        return Inertia::render('Trademark/Registration');
    })->name('trademark.registration');
    
    Route::get('/monitoring', function () {
        return Inertia::render('Trademark/Monitoring');
    })->name('trademark.monitoring');
    
    Route::get('/enforcement', function () {
        return Inertia::render('Trademark/Enforcement');
    })->name('trademark.enforcement');
    
    Route::get('/renewal', function () {
        return Inertia::render('Trademark/Renewal');
    })->name('trademark.renewal');
    
    Route::get('/licensing', function () {
        return Inertia::render('Trademark/Licensing');
    })->name('trademark.licensing');
    
    Route::get('/international', function () {
        return Inertia::render('Trademark/International');
    })->name('trademark.international');
    
    Route::get('/opposition', function () {
        return Inertia::render('Trademark/Opposition');
    })->name('trademark.opposition');
});

// Legal Services Routes
Route::prefix('legal-services')->group(function () {
    Route::get('/', function () {
        return Inertia::render('LegalServices/Overview');
    })->name('legal-services.overview');
    
    Route::get('/business', function () {
        return Inertia::render('LegalServices/Business');
    })->name('legal-services.business');
    
    Route::get('/estate-planning', function () {
        return Inertia::render('LegalServices/EstatePlanning');
    })->name('legal-services.estate-planning');
    
    Route::get('/general-counsel', function () {
        return Inertia::render('LegalServices/GeneralCounsel');
    })->name('legal-services.general-counsel');
    
    Route::get('/privacy', function () {
        return Inertia::render('LegalServices/Privacy');
    })->name('legal-services.privacy');
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

// Admin Routes
Route::prefix('admin')->middleware(['auth', 'verified'])->name('admin.')->group(function () {
    require __DIR__.'/admin.php';
});

require __DIR__.'/auth.php';
