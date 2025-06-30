<?php
session_start();
include("conexion.php");

if (!isset($_SESSION['idUsuario'])) {
    echo "Usuario no logueado";
    exit;
}

$idUsuario = $_SESSION['idUsuario'];
$metodo = $_POST['metodo_pago'] ?? 'Tarjeta'; // Podés adaptar esto si querés más opciones

// Calcular el total del carrito
$sql = "SELECT SUM(precio) AS total FROM Carrito WHERE idUsuario = '$idUsuario'";
$resultado = $conexion->query($sql);
$fila = $resultado->fetch_assoc();
$total = $fila['total'];

if ($total > 0) {
    // Insertar en la tabla ordenes
    $insertOrden = "INSERT INTO ordenes (idUsuario, total, metodo_pago) VALUES ('$idUsuario', '$total', '$metodo')";
    if ($conexion->query($insertOrden) === TRUE) {
        // Vaciar el carrito
        $conexion->query("DELETE FROM Carrito WHERE idUsuario = '$idUsuario'");
        echo "Orden registrada con éxito. Total: $" . number_format($total, 2);
    } else {
        echo "Error al registrar la orden: " . $conexion->error;
    }
} else {
    echo "El carrito está vacío";
}

$conexion->close();
?>
<!-- todo: conexion con base de datos -->