<?php
$servidor = "localhost";
$usuario = "root";
$contrasena = ""; // o la que tengas
$basededatos = "mydb"; // tu base real

$conexion = new mysqli($servidor, $usuario, $contrasena, $basededatos);

if ($conexion->connect_error) {
    die("Error de conexion: " . $conexion->connect_error);
}
?>
<!-- todo: conexion con base de datos -->