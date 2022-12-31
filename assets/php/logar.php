<?php

include("conexao.php");

$login = $_POST['login'];
$senha = $_POST['senha'];

$api = array();

$api['erro'] = false;
$api['mensagem'] = '';

$sqlSenha = $db->prepare("SELECT * FROM administrador WHERE login = ?");
$sqlSenha->bindParam(1, $login);
$sqlSenha->execute();

if($sqlSenha->rowCount() > 0){
    //existe um usuario com esse login
    $data = $sqlSenha->fetch(PDO::FETCH_ASSOC);
    $senhaDb = $data['senha'];

    //conferir se a senha está correta
    if(password_verify($senha, $senhaDb)){
        //a senha está correta
        //criar session e jogar pra pagina dashboard
        // echo "<p>Senha correta</p>";
        $api['user'] = $data['login'];

        if(!isset($_SESSION)){
            session_start();
        }
        $_SESSION['user'] = $data['login'];
        echo json_encode($api);
        // header('Location: http://localhost:8000/');
    }else{
        //a senha esta errada
        // echo "<p>Senha errada</p>";
        $api['erro'] = true;
        $api['mensagem'] = 'Senha incorreta';
        echo json_encode($api);
    }
    
    // $sql = $db->prepare("SELECT * FROM administrador WHERE login = ? AND senha = ?");
    // $sql->bindParam(1, $login);
    // $sql->bindParam(2, password_verify($senha, $senhaDb));
    // $sql->execute();


    // echo "<p>$login</p>";
    // echo "<p>$senha</p>";
}else{
    //não existe esse usuario
    $api['erro'] = true;
    $api['mensagem'] = 'Não existe esse usuário';
    echo json_encode($api);
    // echo "<p>não existe esse usuario</p>";
}
