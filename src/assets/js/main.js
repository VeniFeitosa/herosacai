import {acais, saborCremes, saborAdicionais, saborAdicionaisPagos, bairros2} from './modules.js'
import $ from 'jquery'
import index_umd from 'bootstrap'
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
let volumeAcai

gerarCardsAcai()
gerarSelect()
gerarModal1()
quantidadePedidos()
// $('.prox2').trigger('click')
// $('.finalizar').trigger('click')
$('.troco').hide()

const cards = document.querySelectorAll(".card")
const tituloModais = document.querySelectorAll(".tituloModais")

//gera o título das modais e recebe o volume do acai selecionado
cards.forEach((e)=>{
    e.addEventListener("click", ()=>{
        //gerar modal 1
        // gerarModal1()
        tituloModais.forEach(element =>{
            element.innerHTML = `Açaí ${e.dataset.vol}`
        })
        volumeAcai = e.dataset.vol

    })
})



//codigo antigo

const cremes = document.querySelectorAll(".creme")
const adicionais = document.querySelectorAll(".adi")
const adicionaisPagos = document.querySelectorAll(".adiPag")
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
    cremes.forEach( (e) => {
        if(e.checked){
            let eId = e.id
    
            const label = document.querySelector(`[data-nome="${eId}"]`)
            aCremes.push(label.innerHTML)
        }
        

    })
    
    adicionais.forEach((e)=>{
        if(e.checked){
            let eId = e.id
    
            const label = document.querySelector(`[data-nome="${eId}"]`)
            aAdi.push(label.innerHTML)
        }
    })

    adicionaisPagos.forEach((e)=>{
        if(e.checked){
            let eId = e.id
    
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
    
    // console.log(aCremes)
    stringCremes = aCremes.join(', ')
    
    stringAdicionais = aAdi.join(', ')

    stringAdicionaisPagos = aAdiPag.join('; ')
    // somarAdicionais()
})

selectBairro.addEventListener("change", (e)=>{
    const index = selectBairro.selectedIndex
    const textoSelected = selectBairro.options[index].text
    let frete = document.querySelector(".frete")
    let retorno = saberFreteString(textoSelected)
    precoFrete = BRL(retorno)
    

    if((selectBairro.value == "null")){
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

// $('.prox2').click(()=>{
//     gerarTabelaResumo()
    
// })

$('.finalizar').click(() =>{
    gerarTabelaCarrinho()
    calcularPrecoCarrinho()
})

$('.prox').click(()=>{
    gerarTabelaResumo()
    
})

$('.adicionarCarrinho').click(() =>{
    adicionar()
})

$('.verCompleto').click(() =>{
    pedidoCompleto[6] = carrinho
    // pedidoCompleto.push(carrinho)
    console.log(pedidoCompleto)
})

$('.radios').click((e) =>{
    if(e.target.id == "Dinheiro"){
        $('.troco').show()
    }else{
        $('.troco').hide()
    }

    pedidoCompleto[4] = e.target.id
    console.log(e.target.id)
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
    const cTipo = encodeURI("Tradicional")
    const cVolume = encodeURI(volumeAcai)
    const cCreme = encodeURI(stringCremes)
    const cAdicionais = encodeURI(stringAdicionais)
    const cEndereco = encodeURI("variavel")
    const cPagamento = encodeURI("variavel")
    const cPreco = encodeURI("variavel")

    const texto = `%3D-%3D-%3D-%3D-%3D-%3D-%3D-%3D-%3D-%3D-%3D-%3D-%3D-%3D%0D%0AMENSSAGEM%20PADR%C3%83O%0D%0A---------------------------%0D%0ATipo%20de%20A%C3%A7a%C3%AD%3A%20${cTipo}%20%0D%0AVolume%3A%20${cVolume}%20%0D%0A Cremes%3A%20${cCreme}%20%0D%0AAdicionais%3A%20${cAdicionais}%20%0D%0A---------------------------%0D%0AEndere%C3%A7o%3A%20${cEndereco}%20%0D%0A---------------------------%0D%0APre%C3%A7o%20Total%3A%20${cPreco}%20%0D%0A---------------------------%0D%0APagamento%3A%20${cPagamento}%20%0D%0A ---------------------------%0D%0A%3D-%3D-%3D-%3D-%3D-%3D-%3D-%3D-%3D-%3D-%3D-%3D-%3D-%3D`

    let url = `https://api.whatsapp.com/send?phone=5588988638419&text=${texto}`

    window.location.href = url
}   

function gerarCardsAcai(){
    acais.map((e)=>{
        $(colCards).append(`<div class="card mb-3" style="max-width: 540px;" data-bs-toggle="modal" data-bs-target="#exampleModal" data-vol="${e.volume}">
    <div class="col-md-8">
        <div class="card-body">
            <h5 class="card-title">Açaí ${e.volume}</h5>
            <p class="card-text">${e.precoString}</p>
        </div>
    </div>
    </div>`)
    })
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
    let soma
    let multi = (precoAcai + precoAdiPag) * qtdPedidos.value
    if(precoFrete.value != undefined){
        soma = multi + precoFrete.value 
    }else{
        soma = multi
    }
          
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
    $('.adiPagResumo').html("")

    aAdiPag.forEach(e =>{
        $('.adiPagResumo').append(`<p>${e}</p>`)
    })
}

function gerarTabelaResumo(){

    const mlResumo = $('.mlResumo')[0]
    const cremesResumo = $('.cremesResumo')[0]
    const adiResumo = $('.adiResumo')[0]
    const adiPagResumo = $('.adiPagResumo')[0]
    const freteResumo = $('.freteResumo')[0]
    const precoTotalResumo = $('.precoTotalResumo')[0]

    let preco = calcularPrecoTotal()
    let precoAcaiResumo = saberPrecoAcai()


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
        volume: `Açaí ${volumeAcai} - ${BRL(precoAcaiResumo).format()}`,
        cremes: `${stringCremes}`,
        adicionais: `${stringAdicionais}`,
        adicionaisPagos: `${stringAdicionaisPagos}`,
        precoPedido: `${BRL(preco).format()}`
    }

    carrinho.push(pedido)
    console.log(carrinho)

    // console.log(`Adicionar no carrinho: ${qtdPedidos.value}`)
    // console.log(`Adicionar no carrinho: ${volumeAcai} - ${BRL(precoAcaiResumo).format()}`)
    // console.log(`Adicionar no carrinho: ${stringCremes}`)
    // console.log(`Adicionar no carrinho: ${stringAdicionais}`)
    // console.log(`Adicionar no carrinho: ${stringAdicionaisPagos}`)
    // console.log(`Adicionar no carrinho: ${BRL(preco).format()}`)
}

function finalizar(){

}

function gerarTabelaCarrinho(){
    $('.corpoItens').html('')
    carrinho.forEach((e, index) =>{
        // console.log(e.volume)
        const adiArray = e.adicionais.split(", ")
        const cremesArray = e.cremes.split(", ")
        const adiPagArray = e.adicionaisPagos.split("; ")
        console.log(adiArray)
        console.log(adiPagArray)

        $('.corpoItens').append(`
        <div class="row ${index}">
            <div class="col-md-12 itemTitle">
                (${e.qtd}x) ${e.volume}
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