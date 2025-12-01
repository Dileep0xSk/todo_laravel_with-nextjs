<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\SubmissionController;


Route::post('submissions', [SubmissionController::class, 'store']);
Route::get('submissions', [SubmissionController::class, 'index']);
Route::get('submissions/{id}', [SubmissionController::class, 'show']);
Route::post('submissions/{id}', [SubmissionController::class, 'update']); 
