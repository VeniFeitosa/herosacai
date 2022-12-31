<?php



try {

    $db = new PDO("mysql:host=localhost;dbname=mydb", "root", "root");

    // $db = new PDO("mysql:host=localhost;dbname=id19456161_herosdd", "id19456161__admin", 'GwxVy2ruh|cXH$bl');

    //echo "conectado";

} catch (PDOException $e) {

    echo $e->getMessage();

}