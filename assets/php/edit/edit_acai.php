<?php

include __DIR__ . ("/../conexao.php");



$api = array();



$api['erro'] = false;

$api['mensagem'] = '';



// if(!isset($_SESSION)){

//     session_start();

// }



// if(!isset($_SESSION['user'])){

//     $api['erro'] = true;

//     $api['mensagem'] = 'Não está logado';

//     echo json_encode($api);

//     die();

// }



$sql = $db->prepare("SELECT * FROM acais ORDER by volume");

$sql->execute();

$result = $sql->fetchAll(PDO::FETCH_ASSOC);



$api['acais'] = $result;



echo json_encode($api, JSON_PRESERVE_ZERO_FRACTION | JSON_NUMERIC_CHECK);