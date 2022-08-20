<?php

try {
    $db = new PDO("mysql:host=localhost;dbname=mydb", "root", "root");
    // echo "conectado";
} catch (PDOException $e) {
    echo $e->getMessage();
}