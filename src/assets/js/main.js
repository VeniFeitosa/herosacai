import {tiposAcai, acais, saborCremes, saborAdicionais, saborAdicionaisPagos, semana,  bairros2} from './modules.js'
import $, { data } from 'jquery'
import index_umd from 'bootstrap'
import trashIcon from '../img/trash3.svg'
import imgAcai from '../img/acai.png'
// console.log(trashIcon)
const BRL = value => currency(value, { symbol: 'R$ ', decimal: ',', separator: '.' });

const colCards = document.querySelector(".colCards")
const grupoCremes = document.querySelector(".grupoCremes")
const grupoAdicionais = document.querySelector(".grupoAdicionais")
const grupoAdicionaisPagos = document.querySelector(".grupoAdicionaisPagos")
const selectBairro = document.querySelector("#selectBairro")
const qtdPedidos = $('#qtdPedido')[0]

let precoAdiPag = 0
let precoFrete = 0
let precoTotal = 0
let qtdAdi = 0
let qtdCremes = 0
let limite = 0
let limiteCremes = 0
let volumeAcai

gerarCardsAcai()
gerarSelect()
gerarModal1()
horarioFuncionamento()
quantidadePedidos()
// $('.prox2').trigger('click')
// $('.finalizar').trigger('click')
$('.troco').hide()
$('.finalizar').hide()
const cards = document.querySelectorAll(".card")
const tituloModais = document.querySelectorAll(".tituloModais")

//gera o título das modais e recebe o volume do acai selecionado
cards.forEach((e)=>{
    e.addEventListener("click", ()=>{
        qtdPedidos.value = 1
        removerChecked()
        tituloModais.forEach(element =>{
            element.innerHTML = `Açaí ${e.dataset.vol}`
        })
        volumeAcai = e.dataset.vol
        
        acais.forEach(element =>{
            if(element.volume == e.dataset.vol){
                limite = element.limite
                limiteCremes = element.limiteCremes
            }
        })
        
        $('.descCremes')[0].innerHTML = `Limite de cremes: ${limiteCremes}`
        $('.descAdi')[0].innerHTML = `Limite de adicionais: ${limite}`
        
    })
})



//codigo antigo

const cremes = document.querySelectorAll(".creme")
const adicionais = document.querySelectorAll(".adi")
const adicionaisPagos = document.querySelectorAll(".adiPag")

let tipoSelecionado
let aCremes = []
let aAdi = []
let aAdiPag = []
let carrinho = []
let somacarrinho = 0
let pedidoCompleto = [
    "Bairro",
    "Endereço", 
    "Nome Cliente", 
    "Numero", 
    "Forma de pagamento", 
    "Preço Total"
]

let stringCremes = ''
let stringAdicionais
let stringAdicionaisPagos

// const precosAdi = {nutella:2.50, lCond:1.00, paco:1.00}


const proximo = document.querySelector(".prox")
proximo.addEventListener("click", (e) =>{
    // console.log("Clicou no botão proximo")
    aCremes = []
    aAdi = []
    aAdiPag = []
    precoAdiPag = 0
    let cremesSelec = 0
    let adiSelec = 0
    let adiPagSelec = 0
    cremes.forEach( (e) => {

        if(e.checked){
            let eId = e.id
            cremesSelec++
            const label = document.querySelector(`[data-nome="${eId}"]`)
            aCremes.push(label.innerHTML)
        }
        

    })
    adicionais.forEach((e)=>{
        if(e.checked){
            let eId = e.id
            adiSelec++
            const label = document.querySelector(`[data-nome="${eId}"]`)
            aAdi.push(label.innerHTML)
        }
    })

    adicionaisPagos.forEach((e)=>{
        if(e.checked){
            let eId = e.id
            adiPagSelec++
            const label = document.querySelector(`[data-nome="${eId}"]`)

            saborAdicionaisPagos.map((element)=>{
                if(element.sabor == label.innerHTML && label.innerHTML != "Sem adicional pago"){
                    aAdiPag.push(`${label.innerHTML} +${element.precoString}`)
                    precoAdiPag += element.preco
                    // console.log(label.innerHTML)
                }
            })

            if (label.innerHTML == "Sem adicional pago") {
                aAdiPag[0] = label.innerHTML
                precoAdiPag = 0
            }

            // aAdiPag.push(label.innerHTML)

        }
    })
    

    if(cremesSelec == 0){
        stringCremes = 'Sem creme'
    }else{
        stringCremes = aCremes.join(', ')
    }
    
    if(adiSelec == 0){
        stringAdicionais = 'Sem adicionais'
    }else{
        stringAdicionais = aAdi.join(', ')
    }
    
    if(adiPagSelec == 0){
        stringAdicionaisPagos = 'Sem adicionais pagos'
    }else{
        stringAdicionaisPagos = aAdiPag.join('; ')
    }

    


    const tipoPedido = document.querySelectorAll(".tipo")
    tipoPedido.forEach(e =>{
        if(e.checked){
            tipoSelecionado = e.labels[0].innerText
        }
    })
    // somarAdicionais()
})

selectBairro.addEventListener("change", (e)=>{
    const index = selectBairro.selectedIndex
    const textoSelected = selectBairro.options[index].text
    let frete = document.querySelector(".frete")
    let retorno = saberFreteString(textoSelected)
    precoFrete = BRL(retorno)
    

    if((selectBairro.value == "")){
        frete.innerHTML = ''
        $('.freteCarrinho').html(`Frete: Escolha o bairro`)
    }else{

        frete.innerHTML = `Frete: ${retorno}`
        $('.freteCarrinho').html(`Frete: ${retorno}`)

        let soma = somacarrinho + precoFrete.value

        pedidoCompleto[0] = textoSelected
        $('.totalCarrinho').html(`Preço Total: ${BRL(soma).format()}`)
    }
    
})

//limitando a quantidade de adicionais
adicionais.forEach(e =>{
    e.addEventListener('click', () =>{
        // limitarCremes(e)
        qtdAdi = 0
        adicionais.forEach(element =>{
            if(element.checked){
                qtdAdi++
                
            }
        })

        if(qtdAdi > limite){
            e.checked = false
        }
        console.log(qtdAdi)
    })
})

//limitando a quantidade de cremes
cremes.forEach(e =>{
    e.addEventListener('click', () =>{
        // limitarCremes(e)
        qtdCremes = 0
        cremes.forEach(element =>{
            if(element.checked){
                qtdCremes++
                
            }
        })

        if(qtdCremes > limiteCremes){
            e.checked = false
        }
    })
})


function excluirDoCarrinho(){
    const excluir = document.querySelectorAll(".excluir")
    excluir.forEach(e =>{
        e.addEventListener("click", element =>{
            const exIndex = parseInt(element.target.dataset.index)
            carrinho.splice(exIndex, 1)
            
            const row = $(`.${exIndex}`)
            row.hide()

            console.log(carrinho.length)
            if(carrinho.length == 0){
                $('.finalizar').hide()
                $('.enviar').hide()
                $('.msgCarrinho').show()
            }
            calcularPrecoCarrinho()
            gerarBadgeCarrinho()
        })
    })
    // carrinho.splice(index, 1)
    // gerarTabelaCarrinho()
    // calcularPrecoCarrinho()
}


$('.finalizar').click(() =>{
    selectBairro.options[0].selected = true
    $('.frete').html(``)
    $('.freteCarrinho').html(`Frete: Escolha o bairro`)

    
    gerarTabelaCarrinho()
    excluirDoCarrinho()
    calcularPrecoCarrinho()
    
    
})

$('.prox').click(()=>{
    gerarTabelaResumo()
    
})

$('.adicionarCarrinho').click(() =>{
    adicionar()
    $('.msgCarrinho').hide()
    $('.finalizar').show()
    $('.enviar').show()
    gerarBadgeCarrinho()
})

$('.verCompleto').click(() =>{

    removerChecked()

    pedidoCompleto[6] = carrinho
    // pedidoCompleto.push(carrinho)
    console.log(pedidoCompleto)
})

$('.radios').click((e) =>{
    if(e.target.id == "Dinheiro"){
        $('.troco').show()
    }else{
        $('.troco').hide()
        pedidoCompleto[4] = e.target.id
    }

    

    // console.log(e.target.id)
})

$('.form').submit(e =>{
    console.log("showw")
    enviar()
    e.preventDefault()
})


function somarAdicionais(){
    precoAdiPag = 0
    console.log(`adipag no somarAdicionais: ${aAdiPag}`)
    aAdiPag.forEach((e)=>{
        saborAdicionaisPagos.map((element)=>{
            if(element.sabor == e){
                precoAdiPag += element.preco
            }
        })
    })

    console.log(`Preço total dos adicionais pagos: ${precoAdiPag}`)
}

function redirecionar(){

    /*
    pedidoCompleto[5] = BRL(totalPedido).format()
    */
    const nome = encodeURI(pedidoCompleto[2])
    const bairro = encodeURI(pedidoCompleto[0])
    const endereco = encodeURI(pedidoCompleto[1])
    const numero = encodeURI(pedidoCompleto[3])
    const total = encodeURI(pedidoCompleto[5])
    const pagamento = encodeURI(pedidoCompleto[4])
    const complemento = $('#complemento')[0].value
    
    let texto  = `%3D-%3D-%3D-%3D-%3D-%3D-%3D-%3D-%3D-%3D-%3D-%3D-%3D-%3D-%3D-%3D-%3D-%3D-%3D-%3D-%0AHERO%27S%20A%C3%87A%C3%8D%0A----------------------------------------%0ANome%20do%20Cliente%3A%20${nome}%0A%0ABairro%3A%20${bairro}%0A%0AEndere%C3%A7o%3A%20${endereco}%0A%0ANumero%3A%20${numero}%0A%0AComplemento%3A%20${complemento}%0A----------------------------------------%0APedidos%3A%0A`
    let pedidosURL = itensCarrinhoURL()
    texto += pedidosURL
    texto += `%0ASubtotal%3A%20${BRL(somacarrinho).format()}%0A%0AFrete%3A%20${precoFrete.format()}%0A%0APre%C3%A7o%20Total%3A%20${total}%0A%0APagamento%3A%20${pagamento}%0A%0A%3D-%3D-%3D-%3D-%3D-%3D-%3D-%3D-%3D-%3D-%3D-%3D-%3D-%3D-%3D-%3D-%3D-%3D-%3D-%3D-`

    let url = `https://api.whatsapp.com/send?phone=5588994208481&text=${texto}`

    window.location.href = url
}   

function gerarCardsAcai(){
    acais.map((e)=>{
        $(colCards).append(`<div class="card cardAcai mb-3" data-bs-toggle="modal" data-bs-target="#exampleModal" data-vol="${e.volume}">
        <div class="row g-0">
            <div class="col-4 imgAcai rounded-start">
                
            </div>
            <div class="col-8">
                <div class="card-body">
                    <div class="row">
                        <div class="col d-flex justify-content-between">
                            <h5 class="card-title">Açaí ${e.volume}</h5>
                            <h5>${e.precoString}</h5>
                        </div>
                    </div>
                    <div class="card-text text-muted">Limite de cremes: ${e.limiteCremes}</div>
                    <div class="card-text text-muted">Limite de adicionais: ${e.limite}</div>
                </div>
            </div>
        </div>  
    </div>`)
    })
}

function gerarTiposAcai(){
    tiposAcai.forEach((e, index) =>{
        // console.log(e)
        $('.tiposAcai').append(`<li class="list-group-item"><div class="form-check">
        <input class="form-check-input tipo" type="radio" name="flexRadioDefault" id="tipo${index}">
        <label class="form-check-label" for="tipo${index}">
          ${e}
        </label>
      </div>
      </li>`)
    })
    // document.querySelector('#tipo0').checked = true
}

function gerarOpcoesCremes(){
    saborCremes.map((e)=>{
        $(grupoCremes).append(`<li class="list-group-item">
        <input class="form-check-input me-1 creme" type="checkbox" value="" id="${e.id}">
        <label class="form-check-label stretched-link" for="${e.id}" data-nome="${e.id}">${e.sabor}</label>
      </li>`)
    })
}

function gerarOpcoesAdicionais(){
    saborAdicionais.map((e)=>{
        $(grupoAdicionais).append(`<li class="list-group-item">
        <input class="form-check-input me-1 adi" type="checkbox" value="" id="${e.id}">
        <label class="form-check-label stretched-link" for="${e.id}" data-nome="${e.id}">${e.sabor}</label>
      </li>`)
    })
}

function gerarOpcoesAdicionaisPagos(){
    saborAdicionaisPagos.map((e)=>{
        $(grupoAdicionaisPagos).append(`<li class="list-group-item d-flex justify-content-between align-items-center">
        <div>
          <input class="form-check-input me-1 adiPag" type="checkbox" value="" id="${e.id}">
          <label class="form-check-label stretched-link" for="${e.id}" data-nome="${e.id}">${e.sabor}</label>
        </div>
        <span class="badge bg-primary rounded-pill" data-preco="variavel">${e.precoString}</span>
      </li>`)
    })
}

function gerarModal1(){
    // $(".grupoCremes")[0].innerHTML = ''
    // $(".grupoAdicionais")[0].innerHTML = ''
    // $(".grupoAdicionaisPagos")[0].innerHTML = ''
    gerarTiposAcai()
    gerarOpcoesCremes()
    gerarOpcoesAdicionais()
    gerarOpcoesAdicionaisPagos()
}

function gerarSelect(){
    bairros2.map((e)=>{
        // console.log(e)
        // console.log(selectBairro)
        $(selectBairro).append(`<option value="${e.frete}">${e.bairro}</option>`);
    })
}

function saberFreteString(nomeBairro){
    let freteRetorno
    bairros2.map((e)=>{
        if(e.bairro == nomeBairro){
            freteRetorno = e.freteString
        }
    })

    return freteRetorno
}

function quantidadePedidos(){
    // qtdPedidos.value = 1

    qtdPedidos.addEventListener("change", () =>{
        if(qtdPedidos.value <= 1){
            qtdPedidos.value = 1
        }
        let multiPreco = calcularPrecoTotal()
        const precoResumo = $('.precoTotalResumo')[0]
        precoResumo.innerHTML = `Preço total: <strong>${BRL(multiPreco).format()}</strong>`
        
    })
    
    $('.addPedido').click(e =>{
        qtdPedidos.value++
        // console.log(qtdPedidos.value)
        let multiPreco = calcularPrecoTotal()
        const precoResumo = $('.precoTotalResumo')[0]
        precoResumo.innerHTML = `Preço total: <strong>${BRL(multiPreco).format()}</strong>`
    })

    $('.remPedido').click(e =>{
        if(qtdPedidos.value <= 1){
            qtdPedidos.value = 1
        }else{
            qtdPedidos.value--
        }
        // console.log(qtdPedidos.value)
        let multiPreco = calcularPrecoTotal()
        const precoResumo = $('.precoTotalResumo')[0]
        precoResumo.innerHTML = `Preço total: <strong>${BRL(multiPreco).format()}</strong>`
    })
}

function saberPrecoAcai(){
    let preco
    acais.map(e => {
        if(e.volume == volumeAcai){
            preco = e.preco
        }
    })

    return preco
}

function calcularPrecoTotal(){
    // console.log(qtdPedidos.value)
    let precoAcai = saberPrecoAcai()
    let soma = (precoAcai + precoAdiPag) * qtdPedidos.value
    // let multi = (precoAcai + precoAdiPag) * qtdPedidos.value
    // if(precoFrete.value != undefined){
    //     soma = multi + precoFrete.value 
    // }else{
    //     soma = multi
    // }
          
    // console.log(`soma no calcular: ${precoFrete + precoFrete}`)
    return soma
}

function calcularPrecoCarrinho(){
    somacarrinho = 0
    carrinho.forEach(e =>{
        // console.log(BRL(e.precoPedido).value)
        somacarrinho += BRL(e.precoPedido).value
    })
    console.log(somacarrinho)

    $('.subtotal').html(`Subtotal: ${BRL(somacarrinho).format()}`)
    $('.totalCarrinho').html(`Preço Total: ${BRL(somacarrinho).format()}`)
}

function gerarAdiPagResumo(){
    if(stringAdicionaisPagos == 'Sem adicionais pagos'){
        $('.adiPagResumo').html("Sem adicionais pagos")
    }else{
        $('.adiPagResumo').html("")

        aAdiPag.forEach(e =>{
            $('.adiPagResumo').append(`<p>${e}</p>`)
        })
    }
    
}

function gerarTabelaResumo(){
    const tipoResumo = $('.tipoResumo')[0]
    const mlResumo = $('.mlResumo')[0]
    const cremesResumo = $('.cremesResumo')[0]
    const adiResumo = $('.adiResumo')[0]
    const adiPagResumo = $('.adiPagResumo')[0]
    const freteResumo = $('.freteResumo')[0]
    const precoTotalResumo = $('.precoTotalResumo')[0]

    let preco = calcularPrecoTotal()
    let precoAcaiResumo = saberPrecoAcai()

    tipoResumo.innerHTML = tipoSelecionado
    mlResumo.innerHTML = `Açaí ${volumeAcai} <strong>${BRL(precoAcaiResumo).format()}</strong>`
    cremesResumo.innerHTML = `${stringCremes}`
    adiResumo.innerHTML = `${stringAdicionais}`
    // adiPagResumo.innerHTML = `${stringAdicionaisPagos}`
    gerarAdiPagResumo()
    // freteResumo.innerHTML = `Frete: <strong>${BRL(precoFrete).format()}</strong>` 
    precoTotalResumo.innerHTML = `Preço total: <strong>${BRL(preco).format()}</strong>`
}

function adicionar(){
    let preco = calcularPrecoTotal()
    let precoAcaiResumo = saberPrecoAcai()
    
    const pedido = {
        qtd: `${qtdPedidos.value}`,
        tipo: tipoSelecionado,
        volume: `Açaí ${volumeAcai} - ${BRL(precoAcaiResumo).format()}`,
        cremes: `${stringCremes}`,
        adicionais: `${stringAdicionais}`,
        adicionaisPagos: `${stringAdicionaisPagos}`,
        precoPedido: `${BRL(preco).format()}`
    }

    carrinho.push(pedido)
    console.log(carrinho)
    
}

function formaDePagamento(){
    const radios = document.querySelectorAll(".radios")
    const troco = $('#troco')[0].value
    let pagamento
    radios.forEach(e =>{
        if(e.checked){
            pagamento = e.value
            // console.log(e.value)
        }
    })

    if(pagamento == 'dinheiro'){
        if(troco == ''){
            pedidoCompleto[4] = "Dinheiro; Sem troco"
        }else{
            pedidoCompleto[4] = `Dinheiro; troco para ${BRL(troco).format()}`
        }
    }

    switch (pagamento) {
        case "pix":
            pedidoCompleto[4] = "Pix"
            break;

        case "credito":
            pedidoCompleto[4] = "Cartão de Crédito - Na máquina"
            break;
        
        case "debito":
            pedidoCompleto[4] = "Cartão de Débito - Na máquina"
            break;
        
        default:
            break;
    }
}

function enviar(){
    const nome = $('#nome')[0].value
    const endereco = $('#endereco')[0].value
    const numero = $('#numero')[0].value
    
    const index = selectBairro.selectedIndex
    const bairro = selectBairro.options[index].text

    formaDePagamento()

    let totalPedido = somacarrinho + precoFrete.value

    pedidoCompleto[0] = bairro
    pedidoCompleto[1] = endereco
    pedidoCompleto[2] = nome
    pedidoCompleto[3] = numero
    pedidoCompleto[5] = BRL(totalPedido).format()

    // itensCarrinhoURL()
    redirecionar()
    
}

function removerChecked(){
    $('.troco').hide()
    const checks = document.querySelectorAll(".form-check-input")

    checks.forEach(e =>{
        if(e.checked){
            e.checked = false
            
        }
    })

    document.querySelector('#tipo0').checked = true
}

function gerarTabelaCarrinho(){
    $('.corpoItens').html('')
    carrinho.forEach((e, index) =>{
        // console.log(e.volume)
        const adiArray = e.adicionais.split(", ")
        const cremesArray = e.cremes.split(", ")
        const adiPagArray = e.adicionaisPagos.split("; ")
        // console.log(adiArray)
        // console.log(adiPagArray)

        $('.corpoItens').append(`
        <div class="msgCarrinho" style="display: none;">
            <p class="fw-bold">Sem itens no carrinho</p>
        </div>
        <div class="row ${index}">
            <div class="col-md-12 itemTitle d-flex align-items-center justify-content-between">
                <span>(${e.qtd}x) ${e.volume}</span>
                <img class="excluir" data-index="${index}" src="${trashIcon}" width="24"></img>
            </div>
        </div>`)

        cremesArray.forEach((element =>{
            $(`.${index}`).append(`
            <div class="col-md-12 item">
                ${element}
            </div>`)
        }))

        adiArray.forEach((element =>{
            $(`.${index}`).append(`
            <div class="col-md-12 item">
                ${element}
            </div>`)
        }))

        adiPagArray.forEach((element =>{
            $(`.${index}`).append(`
            <div class="col-md-12 item">
                ${element}
            </div>`)
        }))

    })
        
}

function itensCarrinhoURL(){
    let itensURL = ''

    carrinho.forEach(e =>{
        const tipo = encodeURI(e.tipo)
        const qtd = encodeURI(e.qtd)
        const volume = encodeURI(e.volume)
        const cremes = encodeURI(e.cremes)
        const adicionais = encodeURI(e.adicionais)
        const adicionaisPagos = encodeURI(e.adicionaisPagos)
        const precoPedido = encodeURI(e.precoPedido)

        itensURL += `%0ATipo%3A%20${tipo}%0A%0AQuantidade%3A%20${qtd}x%0A%0AVolume%3A%20${volume}%0A%0ACremes%3A%20${cremes}%0A%0AAdicionais%3A%20${adicionais}%0A%0AAdicionais%20pagos%3A%20${adicionaisPagos}%0A%0APre%C3%A7o%3A%20${precoPedido}%0A%0A----------------------------------------`
    })

    // console.log(itensURL)
    return itensURL
}

function gerarBadgeCarrinho(){

    // $('.finalizar').show()
    $('.qtdCarrinho')[0].innerHTML = carrinho.length
}

function horarioFuncionamento(){

    const dataAtual = new Date()
    const diaSemana = dataAtual.getDay()
    const horaAtual = dataAtual.getHours()
    const minutoAtual = dataAtual.getMinutes()

    let horaCompleta = `${horaAtual}:${minutoAtual}`
    // console.log(`${semana[diaSemana].dia} ${semana[diaSemana].abre} - ${semana[diaSemana].fecha}`)
    const horarioFechar = semana[diaSemana].fecha
    // const horarioFechar = "20:00"
    
    if(horaCompleta >= horarioFechar){
        $('.aberto').hide()
        $('.fechado').show()
        $('.fechado').html("Fechado")
        $('.prox').hide()
    }else{
        $('.aberto').show()
        $('.fechado').hide()
        $('.aberto').html("Aberto")
        $('.prox').show()
    }

    semana.forEach((e, index) =>{
        // console.log(index)
        if(diaSemana == index){
            $('.funcionamento').append(`<li class="list-group-item d-flex justify-content-between">
            <span><strong>${e.dia}</strong></span>
            <span><strong>${e.abre}h - ${e.fecha}h</strong></span>
            </li>`)
        }else{
            $('.funcionamento').append(`<li class="list-group-item d-flex justify-content-between">
            <span>${e.dia}</span>
            <span>${e.abre}h - ${e.fecha}h</span>
            </li>`)
        }
        
    })

    // console.log(`${semana[diaSemana]} ${horaCompleta}`)
}

// function controlarCarrinho(){
//     console.log(carrinho.length)
//     $('.finalizar').show()
   
    
// }

