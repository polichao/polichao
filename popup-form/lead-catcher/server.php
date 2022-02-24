<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
$data = $_POST;
$name = $data['name'];
$tel = $data['tel'];
if ($data) {
  try{
    $name = isset($name) ? $name : '-';
    $tel = isset($tel) ? $tel : '-';
    $output = "---------------------------------" . "\n";
    $output .= date("d-m-Y H:i:s")."\n";
    $output .= "Имя пользователя: ".$name."\n";
    $output .= "Телефон: ".$tel."\n";
    file_put_contents(dirname(__FILE__).'\logs.txt', $output, FILE_APPEND);
    echo "Заявка в обработке";
  }catch(Exception $e){
    echo "Error";
  }
}

?>