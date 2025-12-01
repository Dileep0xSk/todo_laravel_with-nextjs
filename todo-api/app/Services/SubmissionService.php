<?php

namespace App\Services;

use App\Models\Submission;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\ValidationException;

class SubmissionService
{
    public function create($request)
    {
        $data = $request->validate([
            'name'      => 'required|string|max:255',
            'email'     => 'required|email|max:255',
            'number'    => 'required|string|max:20',
            'message'   => 'required|string',
            'document'  => 'required|file|mimes:pdf,doc,docx,png,jpg,jpeg|max:5120',
        ]);

        $path = $request->file('document')->store('uploads/documents', 'public');

        $submission = Submission::create([
            'name'          => $data['name'],
            'email'         => $data['email'],
            'number'        => $data['number'],
            'message'       => $data['message'],
            'document_path' => $path,
        ]);

        $submission->document_url = asset('storage/' . $submission->document_path);

        return $submission;
    }

    public function getAll()
    {
        $submissions = Submission::orderBy('id', 'desc')->get();

        foreach ($submissions as $item) {
            $item->document_url = asset('storage/' . $item->document_path);
        }

        return $submissions;
    }

    public function getById($id)
    {
        $submission = Submission::find($id);

        if (!$submission) {
            return null;
        }

        $submission->document_url = asset('storage/' . $submission->document_path);

        return $submission;
    }

    public function update($request, $submission)
    {
        $data = $request->validate([
            'name'      => 'sometimes|string|max:255',
            'email'     => 'sometimes|email|max:255',
            'number'    => 'sometimes|string|max:20',
            'message'   => 'sometimes|string',
            'document'  => 'sometimes|file|mimes:pdf,doc,docx,png,jpg,jpeg|max:5120',
        ]);

        if ($request->hasFile('document')) {
            if ($submission->document_path && file_exists(public_path('storage/' . $submission->document_path))) {
                unlink(public_path('storage/' . $submission->document_path));
            }

            $data['document_path'] =
                $request->file('document')->store('uploads/documents', 'public');
        }

        $submission->update($data);

        $submission->document_url = asset('storage/' . $submission->document_path);

        return $submission;
    }

    public function delete($submission)
    {
        if ($submission->document_path && file_exists(public_path('storage/' . $submission->document_path))) {
            unlink(public_path('storage/' . $submission->document_path));
        }

        $submission->delete();

        return true;
    }
}
