<?php

class JwtHelper {

    private static $secret_key = "budget_plus_secret_key_2026";

    // Create JWT token
    public static function generateToken($payload) {

        $header = json_encode([
            "alg" => "HS256",
            "typ" => "JWT"
        ]);

        $payload = json_encode($payload);

        $base64Header = self::base64UrlEncode($header);
        $base64Payload = self::base64UrlEncode($payload);

        $signature = hash_hmac(
            "sha256",
            $base64Header . "." . $base64Payload,
            self::$secret_key,
            true
        );

        $base64Signature = self::base64UrlEncode($signature);

        return $base64Header . "." . $base64Payload . "." . $base64Signature;
    }

    // Verify JWT token
    public static function verifyToken($token) {

        $parts = explode(".", $token);

        if (count($parts) !== 3) {
            return false;
        }

        [$header, $payload, $signature] = $parts;

        $validSignature = self::base64UrlEncode(
            hash_hmac("sha256", $header . "." . $payload, self::$secret_key, true)
        );

        if (!hash_equals($validSignature, $signature)) {
            return false;
        }

        $payloadData = json_decode(self::base64UrlDecode($payload), true);

        if (!$payloadData) {
            return false;
        }

        if (isset($payloadData["exp"]) && time() > $payloadData["exp"]) {
            return false;
        }

        return $payloadData;
    }

    private static function base64UrlEncode($data) {
        return rtrim(strtr(base64_encode($data), "+/", "-_"), "=");
    }

    private static function base64UrlDecode($data) {
        return base64_decode(strtr($data, "-_", "+/"));
    }
}