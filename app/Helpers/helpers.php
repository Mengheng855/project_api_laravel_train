<?php

if (!function_exists('apiResponse')) {
    function apiResponse( $message, $status,$data)
    {
        return response()->json([
            'status' => $status,
            'message' => $message,
            'data' => $data
        ]);
    }
}
