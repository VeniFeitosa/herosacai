<?php
// echo "Funcionando";
?>
<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0/dist/css/bootstrap.min.css">
    <link rel="stylesheet" href="./assets/css/main.css">
    <link rel="apple-touch-icon" sizes="180x180" href="./assets/img/apple-touch-icon.png">
    <link rel="icon" type="image/png" sizes="32x32" href="./assets/img/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="16x16" href="./assets/img/favicon-16x16.png">
    <title>Hero's Açaí - Administrador</title>
</head>
<body>
    <div class="container-fluid">
        <!-- <div class="row">
            <div class="col" style="display: flex;justify-content: center;">
                <div class="card">
                    <div class="card-body">
                        <p class="card-text text-danger">
                            Senha inválida
                        </p>
                    </div>
                </div>
            </div>
        </div> -->
        <div class="row">
            <div class="col" style="display: flex;justify-content: center;">
                <div class="form-container" style="width: fit-content;">
                    <form class="logar">
                        <div class="mb-3">
                            <label for="exampleInputEmail1" class="form-label">Login</label>
                            <input type="text" class="form-control" name="login" id="login" required>
                        </div>
                        <div class="mb-3">
                            <label for="exampleInputPassword1" class="form-label">Senha</label>
                            <input type="password" class="form-control" name="senha" id="senha" required>
                        </div>
                        <button type="submit" class="btn btn-primary">Entrar</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0/dist/js/bootstrap.bundle.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
<!-- <script src="./assets/js/currency.min.js"></script> -->
<script type="module" src="./assets/js/main.js"></script>
</body>
</html>
