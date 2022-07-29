const cremes = document.querySelectorAll(".creme")
const adicionais = document.querySelectorAll(".adi")
const adicionaisPagos = document.querySelectorAll(".adiPag")
let aCremes = []
let aAdi = []
let aAdiPag = []

let stringCremes = ''
let stringAdicionais
let stringAdicionaisPagos

const precosAdi = {nutella:2.50, lCond:1.00, paco:1.00}
let precoAdiPag = 0
adicionarPrecos()


const proximo = document.querySelector(".prox")
proximo.addEventListener("click", (e) =>{
    // console.log("Clicou no botão proximo")
    aCremes = []
    aAdi = []
    aAdiPag = []
    cremes.forEach( (e) => {
        if(e.checked){
            eId = e.id
    
            const label = document.querySelector(`[data-nome="${eId}"]`)
            aCremes.push(label.innerHTML)
        }
        

    })
    
    adicionais.forEach((e)=>{
        if(e.checked){
            eId = e.id
    
            const label = document.querySelector(`[data-nome="${eId}"]`)
            aAdi.push(label.innerHTML)
        }
    })

    adicionaisPagos.forEach((e)=>{
        if(e.checked){
            eId = e.id
    
            const label = document.querySelector(`[data-nome="${eId}"]`)
            aAdiPag.push(label.innerHTML)

        }
    })
    
    // console.log(aCremes)
    stringCremes = aCremes.join(', ')
    console.log(stringCremes)
    
    stringAdicionais = aAdi.join(', ')
    console.log(stringAdicionais)

    stringAdicionaisPagos = aAdiPag.join(', ')
    console.log(stringAdicionaisPagos)

    somarAdicionais()
})

const finalizar = document.querySelector(".finalizar")
finalizar.addEventListener("click", redirecionar)

function adicionarPrecos(){
    const pNutella = document.querySelector("[data-preco=nutella]");
    const lCond = document.querySelector("[data-preco=lCond]");
    const paco = document.querySelector("[data-preco=paco]");

    pNutella.innerHTML = `R$${precosAdi.nutella}0`
    lCond.innerHTML = `R$${precosAdi.lCond}.00`
    paco.innerHTML = `R$${precosAdi.paco}.00`
}

function somarAdicionais(){
    precoAdiPag = 0
    aAdiPag.forEach((e)=>{
        switch (e) {
            case "Nutella":
                precoAdiPag+= precosAdi.nutella
                break;
            case "Leite condensado":
                precoAdiPag+= precosAdi.lCond
                break;
            case "Paçoca":
                precoAdiPag+= precosAdi.paco
                break;
            default:
                break;
        }
    })

    console.log(`Preço total dos adicionais pagos: ${precoAdiPag}`)
}

function redirecionar(){
    const cTipo = encodeURI("Tradicional")
    const cVolume = encodeURI("variavel")
    const cCreme = encodeURI(stringCremes)
    const cAdicionais = encodeURI(stringAdicionais)
    const cEndereco = encodeURI("variavel")
    const cPagamento = encodeURI("variavel")
    const cPreco = encodeURI("variavel")

    const texto = `%3D-%3D-%3D-%3D-%3D-%3D-%3D-%3D-%3D-%3D-%3D-%3D-%3D-%3D%0D%0AMENSSAGEM%20PADR%C3%83O%0D%0A---------------------------%0D%0ATipo%20de%20A%C3%A7a%C3%AD%3A%20${cTipo}%20%0D%0AVolume%3A%20${cVolume}%20%0D%0A Cremes%3A%20${cCreme}%20%0D%0AAdicionais%3A%20${cAdicionais}%20%0D%0A---------------------------%0D%0AEndere%C3%A7o%3A%20${cEndereco}%20%0D%0A---------------------------%0D%0APre%C3%A7o%20Total%3A%20${cPreco}%20%0D%0A---------------------------%0D%0APagamento%3A%20${cPagamento}%20%0D%0A ---------------------------%0D%0A%3D-%3D-%3D-%3D-%3D-%3D-%3D-%3D-%3D-%3D-%3D-%3D-%3D-%3D`

    let url = `https://api.whatsapp.com/send?phone=5588988638419&text=${texto}`

    window.location.href = url
}   





