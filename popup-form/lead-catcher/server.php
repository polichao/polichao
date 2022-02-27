<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);

header('Content-Type: application/json');
//header('Content-Type: text/html');
header('Access-Control-Allow-Origin: *');
$data = $_POST ?? null;
$name = $data['name'] ?? null;
$tel = $data['tel'] ?? null;
$timezone = new DateTimeZone("+0300");
$db = new SQLite3("database");

/** 
$db->exec("
CREATE TABLE leads (
	id INTEGER PRIMARY KEY,
	name TEXT NOT NULL,
	tel TEXT NOT NULL
)
");
*/


if ($data) {
    $name = $name ?? '-';
    $tel = str_replace(['-',' ','+'], '', $tel);
    $tel = $tel ?? '-';

    $output = "---------------------------------" . "\n";
    $output .= (new DateTime())->setTimezone($timezone)->format("d-m-Y H:i:s")."\n";
    $output .= "Имя пользователя: ".$name."\n";
    $output .= "Телефон: ".$tel."\n";
    
    $query = sprintf('INSERT into leads (tel, name) values ("%s", "%s")', $tel, $name);
    $db->exec($query);
  
    file_put_contents(dirname(__FILE__).'\logs.txt', $output, FILE_APPEND);
    echo "Заявка в обработке";
}





