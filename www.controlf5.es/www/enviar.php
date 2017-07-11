<?php
$pagina = "gracias.html";
Header("Location: $pagina");
?>

<?php
$para = 'damdvd@gmail.com';
$asunto = 'Mensaje desde ControlF5';
$nombre = $_POST['nombre'];
$mail = $_POST['email'];
$contenido = "Este mensaje fue enviado por " . $nombre . " \r\n";
$contenido .= "Su e-mail es: " . $mail . " \r\n";
$contenido .= "Mensaje: " . $_POST['mensaje'] . " \r\n";
mail($para, $asunto, $contenido);
?>