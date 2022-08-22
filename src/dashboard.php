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
    <nav class="navbar navbar-expand-md sticky-top mb-3 navDash" style="background-color: #2f0147;">
        <div class="container-fluid">
            <button class="navbar-toggler" type="button" 
            data-bs-toggle="offcanvas" data-bs-target="#offcanvasExample"
            aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="dropdown">
                <a href="#" class="d-flex align-items-center text-white text-decoration-none dropdown-toggle" id="dropdownUser2" data-bs-toggle="dropdown" aria-expanded="false">
                    <!-- <img src="https://github.com/mdo.png" alt="" width="32" height="32" class="rounded-circle me-2"> -->
                    <strong><?php echo $_SESSION['user']?></strong>
                </a>
                <ul class="dropdown-menu text-small shadow" aria-labelledby="dropdownUser2" style="left: -68px;">
                    <!-- <li><a class="dropdown-item" href="#">New project...</a></li>
                    <li><a class="dropdown-item" href="#">Settings</a></li>
                    <li><a class="dropdown-item" href="#">Profile</a></li>
                    <li><hr class="dropdown-divider"></li> -->
                    <li><a class="dropdown-item sair" href="#">Sair</a></li>
                </ul>
            </div>
            <div class="collapse navbar-collapse" id="navbarTogglerDemo01">
                
            </div>
        </div>
    </nav>
    <nav class="navbar navbar-light navLg" style="background-color: #2f0147;">
        <div class="container-fluid">
            <span class="navbar-brand" href="#">
                <img src="./assets/img/logo.png" alt="" width="80" height="80">
            </span>
        </div>
    </nav>
    <div class="container-fluid container-main">
        <div class="row ">
            <div class="col-md-3 col-xl-2 sideMenu p-0 shadow">
                <div class="d-flex flex-column flex-shrink-0 p-0 bg-primary" style="width: 100%; height: calc(100vh - 106px);">
                    <div href="/" class="d-flex align-items-center w-100 justify-content-center me-md-auto link-dark text-decoration-none">
                    </div>
                    <div class="accordion accordion-flush mt-3" id="accordionFlushExample">
                        <div class="accordion-item mb-1">
                            <h2 class="accordion-header" id="flush-headingOne">
                            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
                                Tipos de Açaí
                            </button>
                            </h2>
                            <div id="flush-collapseOne" class="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
                                <div class="accordion-body p-0">
                                    <ul class="list-group">
                                        <li class="list-group-item li-add-tipo menu">Adicionar novo tipo</li>
                                        <li class="list-group-item li-editar-tipo menu">Editar disponibilidade</li>
                                        <li class="list-group-item li-excluir-tipo menu">Excluir tipos</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div class="accordion-item mb-1">
                            <h2 class="accordion-header" id="flush-headingTwo">
                            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseTwo" aria-expanded="false" aria-controls="flush-collapseTwo">
                                Acaís
                            </button>
                            </h2>
                            <div id="flush-collapseTwo" class="accordion-collapse collapse" aria-labelledby="flush-headingTwo" data-bs-parent="#accordionFlushExample">
                            <div class="accordion-body p-0">
                                    <ul class="list-group">
                                        <li class="list-group-item li-add-acai menu">Adicionar novo açaí</li>
                                        <li class="list-group-item li-excluir-acai menu">Excluir açaís</li>
                                    </ul>
                            </div>
                            </div>
                        </div>
                        <div class="accordion-item mb-1">
                            <h2 class="accordion-header" id="flush-headingThree">
                            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseThree" aria-expanded="false" aria-controls="flush-collapseThree">
                                Cremes
                            </button>
                            </h2>
                            <div id="flush-collapseThree" class="accordion-collapse collapse" aria-labelledby="flush-headingThree" data-bs-parent="#accordionFlushExample">
                            <div class="accordion-body p-0">
                                    <ul class="list-group">
                                        <li class="list-group-item li-add-creme menu">Adicionar novo creme</li>
                                        <li class="list-group-item li-editar-creme menu">Editar disponibilidade</li>
                                        <li class="list-group-item li-excluir-creme menu">Excluir cremes</li>
                                    </ul>
                            </div>
                            </div>
                        </div>
                        <div class="accordion-item mb-1">
                            <h2 class="accordion-header" id="adicionais">
                            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-adicionais" aria-expanded="false" aria-controls="flush-adicionais">
                                Adicionais
                            </button>
                            </h2>
                            <div id="flush-adicionais" class="accordion-collapse collapse" aria-labelledby="flush-adicionais" data-bs-parent="#accordionFlushExample">
                            <div class="accordion-body p-0">
                                    <ul class="list-group">
                                        <li class="list-group-item li-add-adi menu">Adicionar novo adicional</li>
                                        <li class="list-group-item li-editar-adi menu">Editar disponibilidade</li>
                                        <li class="list-group-item li-excluir-adi menu">Excluir adicionais</li>
                                    </ul>
                            </div>
                            </div>
                        </div>
                        <div class="accordion-item mb-1">
                            <h2 class="accordion-header" id="adicionaisPagos">
                            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-adicionaisPagos" aria-expanded="false" aria-controls="flush-adicionaisPagos">
                                Adicionais Pagos
                            </button>
                            </h2>
                            <div id="flush-adicionaisPagos" class="accordion-collapse collapse" aria-labelledby="flush-adicionaisPagos" data-bs-parent="#accordionFlushExample">
                            <div class="accordion-body p-0">
                                    <ul class="list-group">
                                        <li class="list-group-item li-add-adiPag menu">Adicionar novo adicional pago</li>
                                        <li class="list-group-item li-editar-adiPag menu">Editar disponibilidade</li>
                                        <li class="list-group-item li-excluir-adiPag menu">Excluir adicionais pagos</li>
                                    </ul>
                            </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="dropdown p-3" style="margin-top: auto;">
                        <a href="#" class="d-flex align-items-center text-white text-decoration-none dropdown-toggle" id="dropdownUser2" data-bs-toggle="dropdown" aria-expanded="false">
                            <strong><?php echo $_SESSION['user']?></strong>
                        </a>
                        <ul class="dropdown-menu text-small shadow" aria-labelledby="dropdownUser2" style="">
                            <!-- <li><a class="dropdown-item" href="#">New project...</a></li>
                            <li><a class="dropdown-item" href="#">Settings</a></li>
                            <li><a class="dropdown-item" href="#">Profile</a></li>
                            <li><hr class="dropdown-divider"></li> -->
                            <li><a class="dropdown-item sair" href="#">Sair</a></li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="col-md-9 col-xl-10 p-0">
                <div class="container-fluid">
                    <div class="row">
                        <div class="col mainCol pt-2">
                                                                                   
                            

                            

                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="offcanvas offcanvas-start bg-primary" style="width: 250px;" tabindex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
        <div class="offcanvas-header justify-content-end">
            <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div class="offcanvas-body p-0">
            <!-- aaaaaaaaaaaaaaaa -->
            <div class="row">
                <div class="col-md-3 p-0">
                    <div class="d-flex flex-column flex-shrink-0 p-0 bg-primary" style="width: 100%; height: calc(100vh - 106px);">
                        <div href="/" class="d-flex mb-2 mt-2 align-items-center w-100 justify-content-center me-md-auto link-dark text-decoration-none">
                        </div>
                        <div class="accordion accordion-flush mt-3" id="accordionFlushExample2">
                            <div class="accordion-item mb-1">
                                <h2 class="accordion-header" id="flush-headingOne2">
                                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne2" aria-expanded="false" aria-controls="flush-collapseOne2">
                                    Tipos de Açaí
                                </button>
                                </h2>
                                <div id="flush-collapseOne2" class="accordion-collapse collapse" aria-labelledby="flush-headingOne2" data-bs-parent="#accordionFlushExample2">
                                    <div class="accordion-body p-0">
                                        <ul class="list-group">
                                            <li class="list-group-item li-add-tipo menu" data-bs-dismiss="offcanvas" aria-label="Close">Adicionar novo tipo</li>
                                            <li class="list-group-item li-editar-tipo menu" data-bs-dismiss="offcanvas" aria-label="Close">Editar disponibilidade</li>
                                            <li class="list-group-item li-excluir-tipo menu" data-bs-dismiss="offcanvas" aria-label="Close">Excluir tipos</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div class="accordion-item mb-1">
                                <h2 class="accordion-header" id="flush-headingTwo2">
                                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseTwo2" aria-expanded="false" aria-controls="flush-collapseTwo2">
                                    Acaís
                                </button>
                                </h2>
                                <div id="flush-collapseTwo2" class="accordion-collapse collapse" aria-labelledby="flush-headingTwo2" data-bs-parent="accordionFlushExample2">
                                <div class="accordion-body p-0">
                                        <ul class="list-group">
                                            <li class="list-group-item li-add-acai menu" 
                                            data-bs-dismiss="offcanvas" aria-label="Close">Adicionar novo açaí</li>
                                            <li class="list-group-item li-excluir-acai menu" 
                                            data-bs-dismiss="offcanvas" aria-label="Close">Excluir açaís</li>
                                        </ul>
                                </div>
                                </div>
                            </div>
                            <div class="accordion-item mb-1">
                                <h2 class="accordion-header" id="flush-headingThree2">
                                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseThree2" aria-expanded="false" aria-controls="flush-collapseThree2">
                                    Cremes
                                </button>
                                </h2>
                                <div id="flush-collapseThree2" class="accordion-collapse collapse" aria-labelledby="flush-headingThree2" data-bs-parent="accordionFlushExample2">
                                <div class="accordion-body p-0">
                                        <ul class="list-group">
                                            <li class="list-group-item li-add-creme menu" 
                                            data-bs-dismiss="offcanvas" aria-label="Close">Adicionar novo creme</li>
                                            <li class="list-group-item li-editar-creme menu" 
                                            data-bs-dismiss="offcanvas" aria-label="Close">Editar disponibilidade</li>
                                            <li class="list-group-item li-excluir-creme menu" 
                                            data-bs-dismiss="offcanvas" aria-label="Close">Excluir cremes</li>
                                        </ul>
                                </div>
                                </div>
                            </div>
                            <div class="accordion-item mb-1">
                                <h2 class="accordion-header" id="adicionais2">
                                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-adicionais2" aria-expanded="false" aria-controls="flush-adicionais2">
                                    Adicionais
                                </button>
                                </h2>
                                <div id="flush-adicionais2" class="accordion-collapse collapse" aria-labelledby="flush-adicionais2" data-bs-parent="accordionFlushExample2">
                                <div class="accordion-body p-0">
                                        <ul class="list-group">
                                            <li class="list-group-item li-add-adi menu" 
                                            data-bs-dismiss="offcanvas" aria-label="Close">Adicionar novo adicional</li>
                                            <li class="list-group-item li-editar-adi menu" 
                                            data-bs-dismiss="offcanvas" aria-label="Close">Editar disponibilidade</li>
                                            <li class="list-group-item li-excluir-adi menu" 
                                            data-bs-dismiss="offcanvas" aria-label="Close">Excluir adicionais</li>
                                        </ul>
                                </div>
                                </div>
                            </div>
                            <div class="accordion-item mb-1">
                                <h2 class="accordion-header" id="adicionaisPagos2">
                                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-adicionaisPagos2" aria-expanded="false" aria-controls="flush-adicionaisPagos2">
                                    Adicionais Pagos
                                </button>
                                </h2>
                                <div id="flush-adicionaisPagos2" class="accordion-collapse collapse" aria-labelledby="flush-adicionaisPagos2" data-bs-parent="accordionFlushExample2">
                                <div class="accordion-body p-0">
                                        <ul class="list-group">
                                            <li class="list-group-item li-add-adiPag menu" 
                                            data-bs-dismiss="offcanvas" aria-label="Close">Adicionar novo adicional pago</li>
                                            <li class="list-group-item li-editar-adiPag menu" 
                                            data-bs-dismiss="offcanvas" aria-label="Close">Editar disponibilidade</li>
                                            <li class="list-group-item li-excluir-adiPag menu" 
                                            data-bs-dismiss="offcanvas" aria-label="Close">Excluir adicionais pagos</li>
                                        </ul>
                                </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- <div class="d-flex flex-column flex-shrink-0 p-3 bg-primary" style="width: 100%; height: 100%">
                <p href="/" class="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-dark text-decoration-none">
                    <span class="fs-4">Hero's Açaí</span>
                </p>
                <hr>
                <ul class="nav nav-pills flex-column mb-auto">
                    <li class="nav-item">
                        <a href="#" class="nav-link link-dark">
                        Tipos de Açaí
                        </a>
                    </li>
                    <li>
                        <a href="#" class="nav-link link-dark">
                        Tipos de Cremes
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
                </ul>
            </div> -->
        </div>
    </div>
    
  

    
    <!-- <p>Bem vindo,</p> -->
    <!-- <a href="" class="btn btn-primary sair">Sair</a> -->
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0/dist/js/bootstrap.bundle.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/js/toastr.min.js" integrity="sha512-VEd+nq25CkR676O+pLBnDW09R7VQX9Mdiij052gVCp5yVH3jGtH70Ho/UUv4mJDsEdTvqRCFZg0NKGiojGnUCw==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
<script src="./assets/js/currency.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-maskmoney/3.0.2/jquery.maskMoney.min.js" integrity="sha512-Rdk63VC+1UYzGSgd3u2iadi0joUrcwX0IWp2rTh6KXFoAmgOjRS99Vynz1lJPT8dLjvo6JZOqpAHJyfCEZ5KoA==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
<script>
    $("#cadPrecoAcai").maskMoney({prefix:'R$ ', allowNegative: false, thousands:'.', decimal:','})
    $("#cadPrecoAdiPag").maskMoney({prefix:'R$ ', allowNegative: false, thousands:'.', decimal:','})
</script>
<script type="module" src="./assets/js/main.js"></script>
</body>
</html>