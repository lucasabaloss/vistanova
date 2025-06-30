<?php
session_start();
include("conexion.php");

if (!isset($_SESSION['idUsuario'])) {
    echo "Producto agregado al carrito";
    exit;
}

$idUsuario = $_SESSION['idUsuario'];
$id_carrito = $_POST['id_carrito'];
$id_producto = $_POST['id_producto'];
$cantidad = $_POST['cantidad'];

$sql = "INSERT INTO Carrito (idUsuario, id_carritto, id_producto, cantidad) VALUES ('$idUsuario', '$id_carrito', '$id_producto', '$cantidad')";
if ($conexion->query($sql) === TRUE) {
    echo "Producto agregado al carrito";
} else {
    echo "Error: " . $conexion->error;
}

$conexion->close();
?>
