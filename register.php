<?php
include("conexion.php");

$email = $_POST['email'];
$password = $_POST['password'];

$sql = "SELECT * FROM Usuarios WHERE email = '$email'";
$resultado = $conexion->query($sql);

if ($resultado->num_rows > 0) {
    echo "El usuario ya existe.";
} else {
    $hash = password_hash($password, PASSWORD_DEFAULT);
    $insertar = "INSERT INTO Usuarios (email, contrasena) VALUES ('$email', '$hash')";
    if ($conexion->query($insertar)) {
        header("Location: ingreso.html");
        exit();
    } else {
        echo "Error: " . $conexion->error;
    }
}

$password_seguro = password_hash($_POST["password"], PASSWORD_DEFAULT);

?>
<!-- todo: conexion con base de datos -->