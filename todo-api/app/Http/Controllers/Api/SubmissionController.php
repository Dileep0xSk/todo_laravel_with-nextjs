<?php

namespace App\Http\Controllers\Api;

use App\Models\Submission;
use Illuminate\Http\Request;
use App\Services\SubmissionService;
use App\Http\Controllers\Controller;
use Illuminate\Validation\ValidationException;

class SubmissionController extends Controller
{
    protected $submissionService;

    public function __construct(SubmissionService $submissionService)
    {
        $this->submissionService = $submissionService;
    }

    // CREATE
    public function store(Request $request)
    {
        try {
            $submission = $this->submissionService->create($request);

            return response()->json([
                'success' => true,
                'message' => 'Submission created successfully',
                'data'    => $submission
            ], 201);
        } catch (ValidationException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors'  => $e->errors(),
            ], 422);
        }
    }

    // READ ALL
    public function index()
    {
        $submissions = $this->submissionService->getAll();

        return response()->json([
            'success' => true,
            'data' => $submissions
        ]);
    }

    // READ SINGLE
    public function show($id)
    {
        $submission = $this->submissionService->getById($id);

        if (!$submission) {
            return response()->json([
                'success' => false,
                'message' => 'Submission not found'
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => $submission
        ]);
    }

    // UPDATE
    public function update(Request $request, $id)
    {
        $submission = Submission::find($id);

        if (!$submission) {
            return response()->json([
                'success' => false,
                'message' => 'Submission not found'
            ], 404);
        }

        try {
            $updated = $this->submissionService->update($request, $submission);

            return response()->json([
                'success' => true,
                'message' => 'Submission updated successfully',
                'data'    => $updated
            ]);
        } catch (ValidationException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors'  => $e->errors(),
            ], 422);
        }
    }

    // DELETE
    public function destroy($id)
    {
        $submission = Submission::find($id);

        if (!$submission) {
            return response()->json([
                'success' => false,
                'message' => 'Submission not found'
            ], 404);
        }

        $this->submissionService->delete($submission);

        return response()->json([
            'success' => true,
            'message' => 'Submission deleted successfully'
        ]);
    }
}
