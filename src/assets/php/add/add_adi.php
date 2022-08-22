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

$cadAdi = $_POST['cadAdi'];
$faltaAdi;

if(isset($_POST['faltaAdi'])){
    $faltaAdi = 1;
    
}else{
    $faltaAdi = 0;
}

$sqlExiste = $db->prepare("SELECT sabor FROM adicionais WHERE sabor = ?");
$sqlExiste->bindParam(1, $cadAdi);
$sqlExiste->execute();

if($sqlExiste->rowCount() > 0){
    $api['erro'] = true;
    $api['mensagem'] = 'Esse sabor já existe!';
}else{
    //cadastrar no banco
    $sql = $db->prepare("INSERT INTO adicionais(sabor, falta) VALUES(?, ?)");
    $sql->bindParam(1, $cadAdi);
    $sql->bindParam(2, $faltaAdi);

    if($sql->execute()){
        $api['mensagem'] = 'Adicionado com sucesso!';
    }else{
        $api['erro'] = true;
        $api['mensagem'] = 'Erro ao adicionar!';
    }
}

echo json_encode($api);