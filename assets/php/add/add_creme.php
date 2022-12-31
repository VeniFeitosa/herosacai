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

$cadCreme = $_POST['cadCreme'];
$faltaCreme;

if(isset($_POST['faltaCreme'])){
    $faltaCreme = 1;
    
}else{
    $faltaCreme = 0;
}

$sqlExiste = $db->prepare("SELECT sabor FROM cremes WHERE sabor = ?");
$sqlExiste->bindParam(1, $cadCreme);
$sqlExiste->execute();

if($sqlExiste->rowCount() > 0){
    $api['erro'] = true;
    $api['mensagem'] = 'Esse sabor já existe!';
}else{
    //cadastrar no banco
    $sql = $db->prepare("INSERT INTO cremes(sabor, falta) VALUES(?, ?)");
    $sql->bindParam(1, $cadCreme);
    $sql->bindParam(2, $faltaCreme);

    if($sql->execute()){
        $api['mensagem'] = 'Adicionado com sucesso!';
    }else{
        $api['erro'] = true;
        $api['mensagem'] = 'Erro ao adicionar!';
    }
}

echo json_encode($api);