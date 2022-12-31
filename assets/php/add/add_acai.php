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

$volume = $post['volume'];
$preco = $post['preco'];
$limAdi = $post['limAdi'];
$limCreme = $post['limCreme'];

$sql = $db->prepare("INSERT INTO acais(volume, preco, limiteAdi, limiteCremes) values(?, ?, ?, ?)");
$sql->bindParam(1, $volume);
$sql->bindParam(2, $preco);
$sql->bindParam(3, $limAdi);
$sql->bindParam(4, $limCreme);

if($sql->execute()){
    $api['mensagem'] = 'Adicionado com sucesso!';
}else{
    $api['erro'] = true;
    $api['mensagem'] = 'Erro ao adicionar!';
}

echo json_encode($api);