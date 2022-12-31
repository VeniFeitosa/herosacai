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



$cadTipo = $_POST['cadTipo'];

$faltaTipo;

if(isset($_POST['faltaTipo'])){

    $faltaTipo = 1;

    

}else{

    $faltaTipo = 0;

}



$sqlExiste = $db->prepare("SELECT tipo FROM tipo_acai WHERE tipo = ?");

$sqlExiste->bindParam(1, $cadTipo);

$sqlExiste->execute();



if($sqlExiste->rowCount() > 0){

    $api['erro'] = true;

    $api['mensagem'] = 'Esse tipo já existe!';

}else{

    //cadastrar no banco

    $sql = $db->prepare("INSERT INTO tipo_acai(tipo, falta) VALUES(?, ?)");

    $sql->bindParam(1, $cadTipo);

    $sql->bindParam(2, $faltaTipo);



    if($sql->execute()){

        $api['mensagem'] = 'Adicionado com sucesso!';

    }else{

        $api['erro'] = true;

        $api['mensagem'] = 'Erro ao adicionar!';

    }

}

echo json_encode($api);





