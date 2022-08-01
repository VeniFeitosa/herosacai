import {acais, saborCremes, saborAdicionais, saborAdicionaisPagos, bairros2} from './modules.js'
import $ from 'jquery'
import index_umd from 'bootstrap'
const colCards = document.querySelector(".colCards")
const grupoCremes = document.querySelector(".grupoCremes")
const grupoAdicionais = document.querySelector(".grupoAdicionais")
const grupoAdicionaisPagos = document.querySelector(".grupoAdicionaisPagos")
const selectBairro = document.querySelector("#selectBairro")

gerarSelect()
gerarModal1()

const cards = document.querySelectorAll(".card")
const titulo1 = document.querySelector(".titulo1")
cards.forEach((e)=>{
    e.addEventListener("click", ()=>{
        //gerar modal 1
        titulo1.innerHTML = `Açaí ${e.dataset.vol}`
        volumeAcai = e.dataset.vol
    })
})

selectBairro.addEventListener("click", (e)=>{
    const index = selectBairro.selectedIndex
    const textoSelected = selectBairro.options[index].text
    let frete = document.querySelector(".frete")
    let retorno = saberFreteString(textoSelected)

    console.log(selectBairro.value)

    if((selectBairro.value == "null")){
        frete.innerHTML = ''
    }else{

        console.log(retorno)
        frete.innerHTML = `Frete: ${retorno}`
    }
    
    // console.log(textoSelected)
    // console.log(e.target)
})

//codigo antigo

const cremes = document.querySelectorAll(".creme")
const adicionais = document.querySelectorAll(".adi")
const adicionaisPagos = document.querySelectorAll(".adiPag")
let aCremes = []
let aAdi = []
let aAdiPag = []
let volumeAcai = ''

let stringCremes = ''
let stringAdicionais
let stringAdicionaisPagos

// const precosAdi = {nutella:2.50, lCond:1.00, paco:1.00}
let precoAdiPag = 0

const proximo = document.querySelector(".prox")
proximo.addEventListener("click", (e) =>{
    // console.log("Clicou no botão proximo")
    aCremes = []
    aAdi = []
    aAdiPag = []
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
            aAdiPag.push(label.innerHTML)

        }
    })
    
    // console.log(aCremes)
    console.log(`Volume do açaí: ${volumeAcai}`)
    stringCremes = aCremes.join(', ')
    console.log(`Cremes escolhidos: ${stringCremes}`)
    
    stringAdicionais = aAdi.join(', ')
    console.log(`Adicionais escolhido: ${stringAdicionais}`)

    stringAdicionaisPagos = aAdiPag.join(', ')
    console.log(`Adicionais pagos: ${stringAdicionaisPagos}`)
    // console.log(aAdiPag)
    somarAdicionais()
})

// const finalizar = document.querySelector(".finalizar")
// finalizar.addEventListener("click", redirecionar)

function somarAdicionais(){
    precoAdiPag = 0
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
    gerarCardsAcai()
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
            // console.log(e.bairro)
            // console.log(nomeBairro)
            // console.log(e.freteString)
            freteRetorno = e.freteString
        }
    })

    return freteRetorno
}