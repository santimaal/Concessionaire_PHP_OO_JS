<?php
// $path = $_SERVER['DOCUMENT_ROOT'] . "/prueba/framework/";
include($path . 'model/jwt.php');

function tokendecode($token)
{
    $jwt = parse_ini_file($_SERVER['DOCUMENT_ROOT'] . "/prueba/framework/model/jwt.ini");
    $secret = $jwt['secret'];
    $token = $_POST['token'];

    $JWT = new JWT;
    $json = $JWT->decode($token, $secret);
    $json = json_decode($json, TRUE);
    return $json;
}

function tokencreate($username)
{
    $jwt = parse_ini_file($_SERVER['DOCUMENT_ROOT'] . "/prueba/framework/model/jwt.ini");
    $header = $jwt['header'];
    $secret = $jwt['secret'];
    $payload = '{"iat":"' . time() . '","exp":"' . (time() + (60 * 60)) . '","username":"' . $username . '"}';

    $jwt = new JWT;
    $token = $jwt->encode($header, $payload, $secret);
    return $token;
}
