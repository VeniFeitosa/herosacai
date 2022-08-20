<?php

header('Access-Control-Allow-Origin: *');

$api = array();
$api['erro'] = false;
$api['message'] = "";

try {
    $db = new PDO("mysql:host=localhost;dbname=mydb", "root", "root");
    $sql = $db->prepare("SELECT * FROM pessoas");
    $sql->execute();
    
    if($sql->rowCount() > 0){
        $result = $sql->fetchAll(PDO::FETCH_ASSOC);
        $api['users'] = $result;
        $resJSON = json_encode($api);
        echo $resJSON;
    }else{
        $api['erro'] = true;
        $api['message'] = "Não existe usuarios!";
        $resJSON = json_encode($api);
        echo $resJSON;
    }
} catch (PDOException $e) {
    $api['erro'] = true;
    $api['message'] = $e->getMessage();
    $resJSON = json_encode($api);
    echo $resJSON;
    // echo $e->getMessage();
}