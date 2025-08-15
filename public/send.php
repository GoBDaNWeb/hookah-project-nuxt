<?php
$request = json_decode(file_get_contents('php://input'));

$REQUEST = get_object_vars($request);
$to = "<ag@paradigma-digital.ru>";

$subject =  "Сообщение с сайта кальяннадом.рф";
$message = "<p>Вам было отправлено сообщение из формы обратной связи</p><br>";

if (!empty($REQUEST["name"])) {
  $message .= '<p> Имя: <b>' . $REQUEST["name"] . '</b></p>';
}

if (!empty($REQUEST["phone"])) {
  $message .= '<p> Телефон: <b>' . $REQUEST["phone"] . '</b></p>';
}

$headers  = "Content-type: text/html; charset=UTF-8 \r\n";

$sendMail = mail($to, $subject, $message, $headers);
