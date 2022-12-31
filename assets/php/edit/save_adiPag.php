<?php

use function PHPSTORM_META\type;

include __DIR__ . ("/../conexao.php");
// header('Content-Type: application/json; charset=utf-8');
$api = array();

$api['erro'] = false;
$api['mensagem'] = '';

if(!isset($_SESSION)){
    session_start();
}

if(!isset($_SESSION['user'])){
    $api['erro'] = true;
    $api['mensagem'] = 'Não está logado';
    echo json_encode($api);
    die();
}

$post = json_decode(file_get_contents('php://input'), true);
$checkeds = $post['checkeds'];
$uncheckds = $post['uncheckds'];

for ($i=0; $i < sizeof($checkeds); $i++) { 
    $id = $checkeds[$i];

    $sql = $db->prepare("UPDATE adicionaispagos SET falta = 1 WHERE id = ?");
    $sql->bindParam(1, $id);

    if($sql->execute()){
        $api['mensagem'] = 'Salvo com sucesso!';
    }else{
        $api['erro'] = true;
        $api['mensagem'] = 'Erro ao salvar!';
        echo json_encode($api);
        die();
    }
}

for ($i=0; $i < sizeof($uncheckds); $i++) { 
    $id = $uncheckds[$i];

    $sql = $db->prepare("UPDATE adicionaispagos SET falta = 0 WHERE id = ?");
    $sql->bindParam(1, $id);

    if($sql->execute()){
        $api['mensagem'] = 'Salvo com sucesso!';
    }else{
        $api['erro'] = true;
        $api['mensagem'] = 'Erro ao salvar!';
        echo json_encode($api, JSON_PRESERVE_ZERO_FRACTION | JSON_NUMERIC_CHECK);
        die();
    }
}


echo json_encode($api, JSON_PRESERVE_ZERO_FRACTION | JSON_NUMERIC_CHECK);