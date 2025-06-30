<?php
session_start();
include("conexion.php");

if (isset($_SESSION['idUsuario'])) {
    $idUsuario = $_SESSION['idUsuario'];
    $sql = "DELETE FROM Carrito WHERE idUsuario = '$idUsuario'";
    $conexion->query($sql);
}

header("Location: carrito.php");
?>
<!-- todo: conexion con base de datos -->