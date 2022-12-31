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



$bairro = $post['bairro'];

$preco = $post['preco'];

$sqlExiste = $db->prepare("SELECT bairro FROM bairros WHERE bairro = ?");

$sqlExiste->bindParam(1, $bairro);

$sqlExiste->execute();



if($sqlExiste->rowCount() > 0){

    $api['erro'] = true;

    $api['mensagem'] = 'Esse bairro já existe!';

}else{

    //cadastrar no banco

    $sql = $db->prepare("INSERT INTO bairros(bairro, frete) values(?, ?)");

    $sql->bindParam(1, $bairro);

    $sql->bindParam(2, $preco);


    if($sql->execute()){

        $api['mensagem'] = 'Adicionado com sucesso!';

    }else{

        $api['erro'] = true;

        $api['mensagem'] = 'Erro ao adicionar!';

    }
}





echo json_encode($api);