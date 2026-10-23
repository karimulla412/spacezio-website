<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");

if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    http_response_code(200);
    exit;
}

$backendHost = "http://127.0.0.1:8080";
$requestUri = $_SERVER["REQUEST_URI"];
$targetUrl = $backendHost . $requestUri;

function forwardRequest($targetUrl, $method, $headers, $input) {
    $ch = curl_init($targetUrl);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_CUSTOMREQUEST, $method);
    curl_setopt($ch, CURLOPT_TIMEOUT, 10);
    curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
    curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
    if (!empty($input)) {
        curl_setopt($ch, CURLOPT_POSTFIELDS, $input);
    }
    $response = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    $contentType = curl_getinfo($ch, CURLINFO_CONTENT_TYPE);
    $error = curl_error($ch);
    curl_close($ch);
    return [$response, $httpCode, $contentType, $error];
}

$headers = [];
if (function_exists("getallheaders")) {
    foreach (getallheaders() as $key => $val) {
        $lkey = strtolower($key);
        if ($lkey !== "host" && $lkey !== "content-length") {
            $headers[] = "$key: $val";
        }
    }
}

$input = file_get_contents("php://input");
list($response, $httpCode, $contentType, $error) = forwardRequest($targetUrl, $_SERVER["REQUEST_METHOD"], $headers, $input);

// Self-healing: if Node backend is offline, auto-spawn it and retry
if ($response === false || $httpCode === 0) {
    $nodeBinary = "/var/www/8cb90804-971a-4820-9132-6c831eb255fc/.nvm/versions/node/v26.12.1/bin/node";
    $serverScript = "/var/www/8cb90804-971a-4820-9132-6c831eb255fc/deploys/current/backend/server.js";
    $logFile = "/var/www/8cb90804-971a-4820-9132-6c831eb255fc/server.log";
    if (file_exists($nodeBinary) && file_exists($serverScript)) {
        exec("nohup $nodeBinary $serverScript > $logFile 2>&1 &");
        usleep(1500000);
        list($response, $httpCode, $contentType, $error) = forwardRequest($targetUrl, $_SERVER["REQUEST_METHOD"], $headers, $input);
    }
}

if ($response === false || $httpCode === 0) {
    if ($_SERVER["REQUEST_METHOD"] === "GET" && strpos($requestUri, "/api/content") !== false) {
        $siteContentFile = dirname(__DIR__) . "/deploys/current/backend/data/siteContent.json";
        if (file_exists($siteContentFile)) {
            header("Content-Type: application/json");
            echo file_get_contents($siteContentFile);
            exit;
        }
    }
    http_response_code(502);
    header("Content-Type: application/json");
    echo json_encode(["error" => "Backend gateway temporarily unavailable", "details" => $error]);
    exit;
}

http_response_code($httpCode);
if ($contentType) {
    header("Content-Type: $contentType");
}
echo $response;
