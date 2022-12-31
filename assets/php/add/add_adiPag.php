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



$sabor = $post['sabor'];

$preco = $post['preco'];

$faltaAdiPag;



if(isset($post['faltaAdiPag'])){

    $faltaAdiPag = 1;

    

}else{

    $faltaAdiPag = 0;

}

$sqlExiste = $db->prepare("SELECT sabor FROM adicionaispagos WHERE sabor = ?");

$sqlExiste->bindParam(1, $sabor);

$sqlExiste->execute();



if($sqlExiste->rowCount() > 0){

    $api['erro'] = true;

    $api['mensagem'] = 'Esse sabor já existe!';

}else{

    //cadastrar no banco

    $sql = $db->prepare("INSERT INTO adicionaispagos(sabor, preco, falta) values(?, ?, ?)");

    $sql->bindParam(1, $sabor);

    $sql->bindParam(2, $preco);

    $sql->bindParam(3, $faltaAdiPag);





    if($sql->execute()){

        $api['mensagem'] = 'Adicionado com sucesso!';

    }else{

        $api['erro'] = true;

        $api['mensagem'] = 'Erro ao adicionar!';

    }
}


echo json_encode($api);