<?php
include __DIR__ . ("/../conexao.php");

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

$itemDel = $_GET['id'];

$sql = $db->prepare("DELETE FROM acais WHERE id = ?");
$sql->bindParam(1, $itemDel);

if($sql->execute()){
    $api['mensagem'] = 'Excluído com sucesso!';
}else{
    $api['erro'] = true;
    $api['mensagem'] = 'Erro ao excluir!';
}


echo json_encode($api, JSON_PRESERVE_ZERO_FRACTION | JSON_NUMERIC_CHECK);