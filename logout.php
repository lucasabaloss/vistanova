<?php
session_start();
session_unset();
session_destroy();
header("Location: vuelos.html");
exit();
?>
<!-- todo: conexion con base de datos -->