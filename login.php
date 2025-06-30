<?php
session_start();

// Conexión
$host = "localhost";
$user = "root";
$pass = "";
$db = "mydb"; // Usá tu nombre real de base

$conn = new mysqli($host, $user, $pass, $db);

// Verificar conexión
if ($conn->connect_error) {
    die("Error de conexion: " . $conn->connect_error);
}

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $email = $_POST["email"];
    $clave = $_POST["password"];

    if (empty($email) || empty($clave)) {
        echo "Faltan datos.";
        exit;
    }

    $stmt = $conn->prepare("SELECT id_usuario, email, password FROM usuarios WHERE email = ?");
    $stmt->bind_param("s", $email);
    $stmt->execute();

    $resultado = $stmt->get_result();

    if ($resultado->num_rows === 1) {
        $fila = $resultado->fetch_assoc();

        // Verificamos si la contraseña es correcta
        if (password_verify($clave, $fila["password"])) {
            $_SESSION["id_usuario"] = $fila["id_usuario"];
            $_SESSION["email"] = $fila["email"];

            header("Location: vuelos.html");
            exit();
        } else {
            echo "Contraseña incorrecta.";
        }
    } else {
        echo "Usuario no encontrado.";
    }

    $stmt->close();
}

$conn->close();
?>

<!-- todo: conexion con base de datos -->