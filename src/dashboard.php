<?php
if(!isset($_SESSION)){
    session_start();
}

if(!isset($_SESSION['user'])){
    header('Location: http://localhost:8000/src/admin.php');
    die();
}
?>

<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0/dist/css/bootstrap.min.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/css/toastr.min.css" integrity="sha512-vKMx8UnXk60zUwyUnUPM3HbQo8QfmNx7+ltw8Pm5zLusl1XIfwcxo8DbWCqMGKaWeNxWA8yrx5v3SaVpMvR3CA==" crossorigin="anonymous" referrerpolicy="no-referrer" />
    <link rel="stylesheet" href="./assets/css/main.css">
    <link rel="apple-touch-icon" sizes="180x180" href="./assets/img/apple-touch-icon.png">
    <link rel="icon" type="image/png" sizes="32x32" href="./assets/img/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="16x16" href="./assets/img/favicon-16x16.png">
    <title>Hero's Açaí - Dashboard</title>
</head>
<body>
    <nav class="navbar navbar-expand-md sticky-top mb-3 navDash bg-primary">
        <div class="container-fluid">
            <button class="navbar-toggler" type="button" 
            data-bs-toggle="offcanvas" data-bs-target="#offcanvasExample"
            aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="dropdown">
                <a href="#" class="d-flex align-items-center link-dark text-decoration-none dropdown-toggle" id="dropdownUser2" data-bs-toggle="dropdown" aria-expanded="false">
                    <img src="https://github.com/mdo.png" alt="" width="32" height="32" class="rounded-circle me-2">
                    <strong>mdo</strong>
                </a>
                <ul class="dropdown-menu text-small shadow" aria-labelledby="dropdownUser2" style="left: -68px;">
                    <li><a class="dropdown-item" href="#">New project...</a></li>
                    <li><a class="dropdown-item" href="#">Settings</a></li>
                    <li><a class="dropdown-item" href="#">Profile</a></li>
                    <li><hr class="dropdown-divider"></li>
                    <li><a class="dropdown-item sair" href="#">Sair</a></li>
                </ul>
            </div>
            <div class="collapse navbar-collapse" id="navbarTogglerDemo01">
                
            </div>
        </div>
    </nav>
    <nav class="navbar navbar-light" style="background-color: rgb(72 39 131 / 95%);">
        <div class="container-fluid">
            <!-- <span class="navbar-brand text-light mb-0 h1">Navbar</span> -->
            <span class="navbar-brand" href="#">
                <img src="./assets/img/logo.png" alt="" width="80" height="80">
            </span>
        </div>
    </nav>
    <div class="container-fluid container-main">
        <div class="row ">
            <div class="col-md-3 sideMenu p-0">
                <div class="d-flex flex-column flex-shrink-0 p-0 bg-primary" style="width: 100%; height: calc(100vh - 106px);">
                    <div href="/" class="d-flex mb-2 mt-2 align-items-center w-100 justify-content-center me-md-auto link-dark text-decoration-none">
                        <!-- <span class="navbar-brand" href="#">
                            <img src="./assets/img/logo.png" alt="" width="100" height="100">
                        </span> -->
                    </div>
                    <!-- <hr> -->
                    <!--  -->
                    <div class="accordion accordion-flush mt-3" id="accordionFlushExample">
                        <div class="accordion-item">
                            <h2 class="accordion-header" id="flush-headingOne">
                            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
                                Tipos de Açaí
                            </button>
                            </h2>
                            <div id="flush-collapseOne" class="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
                                <div class="accordion-body p-0">
                                    <ul class="list-group">
                                        <li class="list-group-item li-add-tipo">Adicionar novo tipo</li>
                                        <li class="list-group-item li-editar-tipo">Editar disponibilidade</li>
                                        <li class="list-group-item li-excluir-tipo">Excluir tipos</li>
                                        <!-- <li class="list-group-item">A fourth item</li>
                                        <li class="list-group-item">And a fifth one</li> -->
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div class="accordion-item">
                            <h2 class="accordion-header" id="flush-headingTwo">
                            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseTwo" aria-expanded="false" aria-controls="flush-collapseTwo">
                                Acaís
                            </button>
                            </h2>
                            <div id="flush-collapseTwo" class="accordion-collapse collapse" aria-labelledby="flush-headingTwo" data-bs-parent="#accordionFlushExample">
                            <div class="accordion-body">Placeholder content for this accordion, which is intended to demonstrate the <code>.accordion-flush</code> class. This is the second item's accordion body. Let's imagine this being filled with some actual content.</div>
                            </div>
                        </div>
                        <div class="accordion-item">
                            <h2 class="accordion-header" id="flush-headingThree">
                            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseThree" aria-expanded="false" aria-controls="flush-collapseThree">
                                Cremes
                            </button>
                            </h2>
                            <div id="flush-collapseThree" class="accordion-collapse collapse" aria-labelledby="flush-headingThree" data-bs-parent="#accordionFlushExample">
                            <div class="accordion-body">Placeholder content for this accordion, which is intended to demonstrate the <code>.accordion-flush</code> class. This is the third item's accordion body. Nothing more exciting happening here in terms of content, but just filling up the space to make it look, at least at first glance, a bit more representative of how this would look in a real-world application.</div>
                            </div>
                        </div>
                        <div class="accordion-item">
                            <h2 class="accordion-header" id="adicionais">
                            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-adicionais" aria-expanded="false" aria-controls="flush-adicionais">
                                Adicionais
                            </button>
                            </h2>
                            <div id="flush-adicionais" class="accordion-collapse collapse" aria-labelledby="flush-adicionais" data-bs-parent="#accordionFlushExample">
                            <div class="accordion-body">Placeholder content for this accordion, which is intended to demonstrate the <code>.accordion-flush</code> class. This is the third item's accordion body. Nothing more exciting happening here in terms of content, but just filling up the space to make it look, at least at first glance, a bit more representative of how this would look in a real-world application.</div>
                            </div>
                        </div>
                    </div>
                    <!--  -->
                    <!-- <ul class="nav nav-pills flex-column mb-auto">
                        <li class="nav-item">
                            <a href="#" class="nav-link link-dark">
                            Tipos de Açaí
                            </a>
                        </li>
                        <li>
                            <a href="#" class="nav-link link-dark">
                            Tipos de Creme
                            </a>
                        </li>
                        <li>
                            <a href="#" class="nav-link link-dark">
                            Adicionais
                            </a>
                        </li>
                        <li>
                            <a href="#" class="nav-link link-dark">
                            Adicionais Pagos
                            </a>
                        </li>
                        <li>
                            <a href="#" class="nav-link link-dark">
                            Customers
                            </a>
                        </li>
                    </ul> -->
                    
                    <div class="dropdown p-3" style="margin-top: auto;">
                        <a href="#" class="d-flex align-items-center link-dark text-decoration-none dropdown-toggle" id="dropdownUser2" data-bs-toggle="dropdown" aria-expanded="false">
                            <!-- <img src="https://github.com/mdo.png" alt="" width="32" height="32" class="rounded-circle me-2"> -->
                            <strong><?php echo $_SESSION['user']?></strong>
                        </a>
                        <ul class="dropdown-menu text-small shadow" aria-labelledby="dropdownUser2" style="">
                            <li><a class="dropdown-item" href="#">New project...</a></li>
                            <li><a class="dropdown-item" href="#">Settings</a></li>
                            <li><a class="dropdown-item" href="#">Profile</a></li>
                            <li><hr class="dropdown-divider"></li>
                            <li><a class="dropdown-item sair" href="#">Sair</a></li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="col-md-9 p-0">
                <!-- <nav class="navbar navbar-light" style="height: 84px; background-color: rgb(72 39 131 / 95%);">
                    <div class="container-fluid">
                        <span class="navbar-brand text-light mb-0 h1">Navbar</span>
                    </div>
                </nav> -->
                <div class="container-fluid">
                    <div class="row">
                        <div class="col">
                            <div class="card">
                                <div class="card-body">
                                    <h5 class="card-title">
                                        Adicionar novo tipo
                                    </h5>
                                    <form class="formAddTipo">
                                        <div class="mb-3">
                                            <label for="cadTipo" class="form-label">Tipo de Açaí</label>
                                            <input type="text" class="form-control" name="cadTipo" placeholder="Ex: Açaí Tradicional" id="cadTipo" required>
                                        </div>
                                        <div class="mb-3 form-check">
                                            <input type="checkbox" name="faltaTipo" class="form-check-input" id="faltaTipo">
                                            <label class="form-check-label" for="faltaTipo">Está em falta</label>
                                        </div>
                                        <button type="submit" class="btn btn-primary addTipo">Adicionar</button>
                                    </form>
                                </div>
                            </div>

                            <div class="card">
                                <div class="card-body">
                                    <h5 class="card-title">
                                        Editar disponibilidade
                                    </h5>
                                    <p class="card-text">
                                        Marque os que estão em <strong>falta</strong>.
                                    </p>
                                    <ul class="list-group dispoTipo mb-3">
                                    </ul>
                                    <button type="button" class="btn btn-primary salv-editar-tipo">Salvar</button>
                                </div>
                            </div>

                            <div class="card">
                                <div class="card-body">
                                    <h5 class="card-title">
                                        Excluir tipos
                                    </h5>
                                    <ul class="list-group excluirTipo mb-3">
                                        
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="offcanvas offcanvas-start bg-primary" style="width: 250px;" tabindex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
        <div class="offcanvas-header justify-content-end">
            <!-- <h5 class="offcanvas-title" id="offcanvasExampleLabel">Offcanvas</h5> -->
            <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div class="offcanvas-body p-0">
            <div class="d-flex flex-column flex-shrink-0 p-3 bg-primary" style="width: 100%; height: 100%">
                    <p href="/" class="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-dark text-decoration-none">
                        <!-- <svg class="bi me-2" width="40" height="32"><use xlink:href="#bootstrap"></use></svg> -->
                        <span class="fs-4">Hero's Açaí</span>
                    </p>
                    <hr>
                    <ul class="nav nav-pills flex-column mb-auto">
                        <li class="nav-item">
                            <a href="#" class="nav-link link-dark">
                            <!-- <svg class="bi me-2" width="16" height="16"><use xlink:href="#home"></use></svg> -->
                            Tipos de Açaí
                            </a>
                        </li>
                        <li>
                            <a href="#" class="nav-link link-dark">
                            <!-- <svg class="bi me-2" width="16" height="16"><use xlink:href="#speedometer2"></use></svg> -->
                            Tipos de Cremes
                            </a>
                        </li>
                        <li>
                            <a href="#" class="nav-link link-dark">
                            <!-- <svg class="bi me-2" width="16" height="16"><use xlink:href="#table"></use></svg> -->
                            Adicionais
                            </a>
                        </li>
                        <li>
                            <a href="#" class="nav-link link-dark">
                            <!-- <svg class="bi me-2" width="16" height="16"><use xlink:href="#grid"></use></svg> -->
                            Adicionais Pagos
                            </a>
                        </li>
                        <li>
                            <a href="#" class="nav-link link-dark">
                            <!-- <svg class="bi me-2" width="16" height="16"><use xlink:href="#people-circle"></use></svg> -->
                            Customers
                            </a>
                        </li>
                    </ul>
                </div>
        </div>
    </div>
    
  

    
    <!-- <p>Bem vindo,</p> -->
    <!-- <a href="" class="btn btn-primary sair">Sair</a> -->
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0/dist/js/bootstrap.bundle.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/js/toastr.min.js" integrity="sha512-VEd+nq25CkR676O+pLBnDW09R7VQX9Mdiij052gVCp5yVH3jGtH70Ho/UUv4mJDsEdTvqRCFZg0NKGiojGnUCw==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
<!-- <script src="./assets/js/currency.min.js"></script> -->
<script type="module" src="./assets/js/main.js"></script>
</body>
</html>