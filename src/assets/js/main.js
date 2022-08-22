import {htmlExcluirAdiPag, htmlDisponiAdiPag, htmlNovoAdiPag, htmlExcluirAdi, htmlDisponiAdi, htmlNovoAdi, htmlExcluirCreme, htmlDisponiCreme, htmlNovoCreme, htmlExcluirAcai, htmlNovoAcai, htmlExcluirTipo, htmlDisponiTipo, htmlNovoTipo, tiposAcai, acais, saborCremes, saborAdicionais, saborAdicionaisPagos, semana,  bairros2} from './modules.js'

//CONFIGURAÇÕES
const BRL = value => currency(value, { symbol: 'R$ ', decimal: ',', separator: '.' });
toastr.options = {
    "closeButton": false,
    "debug": false,
    "newestOnTop": false,
    "progressBar": false,
    "positionClass": "toast-top-right",
    "preventDuplicates": false,
    "onclick": null,
    "showDuration": "300",
    "hideDuration": "1000",
    "timeOut": "1500",
    "extendedTimeOut": "1000",
    "showEasing": "swing",
    "hideEasing": "linear",
    "showMethod": "fadeIn",
    "hideMethod": "fadeOut"
  }


$('.logar').submit(e =>{
    e.preventDefault()
    const form = $('.logar')[0]

    const formData = new FormData(form)

    fetch('http://localhost:8000/src/assets/php/logar.php', {
        method: 'post',
        body: formData
    }).then(res => res.json()).then(response =>{
        // console.log(response)
        console.log(response)
        
        if(!response.erro){
            // console.log("redirecionar")
            window.location.href = "http://localhost:8000/src/dashboard.php";
        }else{
            if(!response.erro){
                toastr.success(response.mensagem)
            }else{
                toastr.error(response.mensagem)
            }
        }
        // response.users.forEach(e =>{
        //     console.log(e)
        // })
    }).catch(error => console.log(error))

})



$('.sair').click(e =>{
    e.preventDefault()
    // console.log("sair")

    fetch('http://localhost:8000/src/assets/php/sair.php', {
    }).then(e => {
        // console.log('teste')
        window.location.href = "http://localhost:8000/src/admin.php"
    }).catch(error => console.log(error))
})

$('.li-add-tipo').click(e =>{
    cardNovoTipo()

    $('.formAddTipo').submit(e =>{
        e.preventDefault()
        
        const form = $('.formAddTipo')[0]

        const formData = new FormData(form)
        fetch('http://localhost:8000/src/assets/php/add/add_tipo.php', {
            method: 'post',
            body: formData
        }).then(res => res.json()).then(response =>{
            console.log(response)

            if(!response.erro){
                toastr.success(response.mensagem)
            }else{
                toastr.error(response.mensagem)
            }
            
        }).catch(error => console.log(error))
    })
})



$('.li-editar-tipo').click(e =>{
    cardDisponiTipo()
    $('.dispoTipo').html('')
    fetch('http://localhost:8000/src/assets/php/edit/edit_tipo.php').then(res => res.json()).then(response =>{
        // console.log(response)
        response.tipos.forEach(element =>{
            gerarEditarTipo(element.id, element.tipo, element.falta)
        })
    }).catch(error => console.log(error))

    $('.salv-editar-tipo').click(e =>{
        const tiposSelecionados = document.querySelectorAll('.edi-item-tipo')
        let checkeds = [];
        let uncheckds = [];
        tiposSelecionados.forEach(element =>{
            if(element.checked){
                // console.log(element.labels[0].innerText)
                // checkeds.push(element.labels[0].innerText)
                let id = element.id
                checkeds.push(id.replace('tipo', ''))
            }else{
                let id = element.id
                uncheckds.push(id.replace('tipo', ''))
            }
        })
        let data = {checkeds: checkeds, uncheckds: uncheckds}
    
        fetch('http://localhost:8000/src/assets/php/edit/save_tipo.php', {
            method: 'POST',
            body: JSON.stringify(data)
        }).then(res => res.json()).then(response =>{
            if(!response.erro){
                toastr.success(response.mensagem)
            }else{
                toastr.error(response.mensagem)
            }
        }).catch(error => console.log(error))
    
    })
})



$('.li-excluir-tipo').click(e =>{
    cadExcluirTipo()

    $('.excluirTipo').html('')
    fetch('http://localhost:8000/src/assets/php/edit/edit_tipo.php').then(res => res.json()).then(response =>{
        // console.log(response)
        const tipos = response.tipos
        response.tipos.forEach(element =>{
            gerarExcluirTipo(element.id, element.tipo)
        })
        const excluirTipoImg = document.querySelectorAll('.excluir-tipo')
        // console.log(excluirTipoImg)
        excluirTipoImg.forEach(e =>{
            e.addEventListener('click', element =>{
                let id = element.target.dataset.index_tipo
              
                fetch(`http://localhost:8000/src/assets/php/del/del_tipo.php?id=${id}`)
                .then(res => res.json()).then(response =>{
                    console.log(response)

                    $('.excluirTipo').html('')
                    tipos.forEach(element =>{
                        if(element.id != id){
                            gerarExcluirTipo(element.id, element.tipo)
                        }
                    })

                    if(!response.erro){
                        toastr.success(response.mensagem)
                    }else{
                        toastr.error(response.mensagem)
                    }
                }).catch(error => console.log(error))
            })
        })
    }).catch(error => console.log(error))
})

$('.li-add-acai').click(e =>{
    cardNovoAcai()
    $("#cadPrecoAcai").maskMoney({prefix:'R$ ', allowNegative: false, thousands:'.', decimal:','})

    $('.formAddAcai').submit(e =>{
        e.preventDefault()
        
        const volume = $('#cadAcai')[0].value
        const preco = BRL($('#cadPrecoAcai')[0].value).value
        const limAdi = parseInt($('#cadLimAdiAcai')[0].value)
        const limCreme = parseInt($('#cadLimCremeAcai')[0].value)

        const data = {volume:volume, preco: preco, limAdi:limAdi, limCreme:limCreme}
        // console.log(data)

        fetch('http://localhost:8000/src/assets/php/add/add_acai.php', {
            method: 'POST',
            body: JSON.stringify(data)
        }).then(res => res.json()).then(response =>{
            console.log(response)
            if(!response.erro){
                toastr.success(response.mensagem)
            }else{
                toastr.error(response.mensagem)
            }
        }).catch(error => console.log(error))
    })
})

$('.li-excluir-acai').click(e =>{
    cardExcluirAcai()
    
    $('.excluirAcai').html('')
    fetch('http://localhost:8000/src/assets/php/edit/edit_acai.php').then(res => res.json()).then(response =>{
        // console.log(response)
        console.log(response)
        const acais = response.acais
        acais.forEach(element =>{
            gerarExcluirAcai(element.volume, element.id)
        })
        const excluirAcaiImg = document.querySelectorAll('.excluir-acai')
        // console.log(excluirTipoImg)
        excluirAcaiImg.forEach(e =>{
            e.addEventListener('click', element =>{
                let id = element.target.dataset.index_acai
              
                fetch(`http://localhost:8000/src/assets/php/del/del_acai.php?id=${id}`)
                .then(res => res.json()).then(response =>{
                    console.log(response)

                    $('.excluirAcai').html('')
                    acais.forEach(element =>{
                        if(element.id != id){
                            gerarExcluirAcai(element.volume, element.id)
                        }
                    })

                    if(!response.erro){
                        toastr.success(response.mensagem)
                    }else{
                        toastr.error(response.mensagem)
                    }
                }).catch(error => console.log(error))
            })
        })
    }).catch(error => console.log(error))
})

$('.li-add-creme').click(e =>{
    cardNovoCreme()

    $('.formAddCreme').submit(e =>{
        e.preventDefault()
        
        const form = $('.formAddCreme')[0]

        const formData = new FormData(form)
        fetch('http://localhost:8000/src/assets/php/add/add_creme.php', {
            method: 'post',
            body: formData
        }).then(res => res.json()).then(response =>{
            console.log(response)

            if(!response.erro){
                toastr.success(response.mensagem)
            }else{
                toastr.error(response.mensagem)
            }
            
        }).catch(error => console.log(error))
    })
})

$('.li-editar-creme').click(e =>{
    cardDisponiCreme()
    $('.dispoCreme').html('')
    fetch('http://localhost:8000/src/assets/php/edit/edit_creme.php').then(res => res.json()).then(response =>{
        // console.log(response)
        response.cremes.forEach(element =>{
            // gerarEditarTipo(element.id, element.tipo, element.falta)
            gerarEditarCreme(element.id, element.sabor, element.falta)
        })
    }).catch(error => console.log(error))

    $('.salv-editar-creme').click(e =>{
        const cremesSelecionados = document.querySelectorAll('.edi-item-creme')
        let checkeds = [];
        let uncheckds = [];
        cremesSelecionados.forEach(element =>{
            if(element.checked){
                // console.log(element.labels[0].innerText)
                // checkeds.push(element.labels[0].innerText)
                let id = element.id
                checkeds.push(id.replace('creme', ''))
            }else{
                let id = element.id
                uncheckds.push(id.replace('creme', ''))
            }
        })
        let data = {checkeds: checkeds, uncheckds: uncheckds}
    
        fetch('http://localhost:8000/src/assets/php/edit/save_creme.php', {
            method: 'POST',
            body: JSON.stringify(data)
        }).then(res => res.json()).then(response =>{
            console.log(response)
            if(!response.erro){
                toastr.success(response.mensagem)
            }else{
                toastr.error(response.mensagem)
            }
        }).catch(error => console.log(error))
    
    })
})

$('.li-excluir-creme').click(e =>{
    cadExcluirCreme()

    $('.excluirCreme').html('')
    fetch('http://localhost:8000/src/assets/php/edit/edit_creme.php').then(res => res.json()).then(response =>{
        // console.log(response)
        const cremes = response.cremes
        response.cremes.forEach(element =>{
            gerarExcluirCreme(element.id, element.sabor)
        })
        const excluirCremeImg = document.querySelectorAll('.excluir-creme')
        // console.log(excluirTipoImg)
        excluirCremeImg.forEach(e =>{
            e.addEventListener('click', element =>{
                let id = element.target.dataset.index_creme
              
                fetch(`http://localhost:8000/src/assets/php/del/del_creme.php?id=${id}`)
                .then(res => res.json()).then(response =>{
                    console.log(response)

                    $('.excluirCreme').html('')
                    cremes.forEach(element =>{
                        if(element.id != id){
                            gerarExcluirCreme(element.id, element.sabor)
                        }
                    })

                    if(!response.erro){
                        toastr.success(response.mensagem)
                    }else{
                        toastr.error(response.mensagem)
                    }
                }).catch(error => console.log(error))
            })
        })
    }).catch(error => console.log(error))
})

$('.li-add-adi').click(e =>{
    cardNovoAdi()

    $('.formAddAdi').submit(e =>{
        e.preventDefault()
        
        const form = $('.formAddAdi')[0]

        const formData = new FormData(form)
        fetch('http://localhost:8000/src/assets/php/add/add_adi.php', {
            method: 'post',
            body: formData
        }).then(res => res.json()).then(response =>{
            console.log(response)

            if(!response.erro){
                toastr.success(response.mensagem)
            }else{
                toastr.error(response.mensagem)
            }
            
        }).catch(error => console.log(error))
    })
})

$('.li-editar-adi').click(e =>{
    cardDisponiAdi()

    $('.dispoAdi').html('')
    fetch('http://localhost:8000/src/assets/php/edit/edit_adi.php').then(res => res.json()).then(response =>{
        // console.log(response)
        response.adicionais.forEach(element =>{
            // gerarEditarTipo(element.id, element.tipo, element.falta)
            gerarEditarAdi(element.id, element.sabor, element.falta)
        })
    }).catch(error => console.log(error))

    $('.salv-editar-adi').click(e =>{
        const adiSelecionados = document.querySelectorAll('.edi-item-adi')
        let checkeds = [];
        let uncheckds = [];
        adiSelecionados.forEach(element =>{
            if(element.checked){
                // console.log(element.labels[0].innerText)
                // checkeds.push(element.labels[0].innerText)
                let id = element.id
                checkeds.push(id.replace('adi', ''))
            }else{
                let id = element.id
                uncheckds.push(id.replace('adi', ''))
            }
        })
        let data = {checkeds: checkeds, uncheckds: uncheckds}
    
        fetch('http://localhost:8000/src/assets/php/edit/save_adi.php', {
            method: 'POST',
            body: JSON.stringify(data)
        }).then(res => res.json()).then(response =>{
            console.log(response)
            if(!response.erro){
                toastr.success(response.mensagem)
            }else{
                toastr.error(response.mensagem)
            }
        }).catch(error => console.log(error))
    
    })
})

$('.li-excluir-adi').click(e =>{
    cadExcluirAdi()

    $('.excluirAdi').html('')
    fetch('http://localhost:8000/src/assets/php/edit/edit_adi.php').then(res => res.json()).then(response =>{
        // console.log(response)
        const adicionais = response.adicionais
        response.adicionais.forEach(element =>{
            gerarExcluirAdi(element.id, element.sabor)
        })
        const excluirAdiImg = document.querySelectorAll('.excluir-adi')
        // console.log(excluirTipoImg)
        excluirAdiImg.forEach(e =>{
            e.addEventListener('click', element =>{
                let id = element.target.dataset.index_adi
              
                fetch(`http://localhost:8000/src/assets/php/del/del_adi.php?id=${id}`)
                .then(res => res.json()).then(response =>{
                    console.log(response)

                    $('.excluirAdi').html('')
                    adicionais.forEach(element =>{
                        if(element.id != id){
                            gerarExcluirAdi(element.id, element.sabor)
                        }
                    })

                    if(!response.erro){
                        toastr.success(response.mensagem)
                    }else{
                        toastr.error(response.mensagem)
                    }
                }).catch(error => console.log(error))
            })
        })
    }).catch(error => console.log(error))
})

$('.li-add-adiPag').click(e =>{
    cardNovoAdiPag()
    $("#cadPrecoAdiPag").maskMoney({prefix:'R$ ', allowNegative: false, thousands:'.', decimal:','})

    $('.formAddAdiPag').submit(e =>{
        e.preventDefault()
        
        const sabor = $('#cadAdiPag')[0].value
        const preco = BRL($('#cadPrecoAdiPag')[0].value).value
        const faltaAdiPag = $('#faltaAdiPag')[0].checked
        let data

        if(faltaAdiPag){
            data = {sabor:sabor, preco: preco, faltaAdiPag:faltaAdiPag}
        }else{
            data = {sabor:sabor, preco: preco}
        }

        // const data = {sabor:sabor, preco: preco, limAdi:limAdi, limCreme:limCreme}
        // console.log(data)

        fetch('http://localhost:8000/src/assets/php/add/add_adiPag.php', {
            method: 'POST',
            body: JSON.stringify(data)
        }).then(res => res.json()).then(response =>{
            console.log(response)
            if(!response.erro){
                toastr.success(response.mensagem)
            }else{
                toastr.error(response.mensagem)
            }
        }).catch(error => console.log(error))
    })
})

$('.li-editar-adiPag').click(e =>{
    cardDisponiAdiPag()

    $('.dispoAdiPag').html('')
    fetch('http://localhost:8000/src/assets/php/edit/edit_adiPag.php').then(res => res.json()).then(response =>{
        // console.log(response)
        response.adicionaisPag.forEach(element =>{
            gerarEditarAdiPag(element.id, element.sabor, element.falta)
        })
    }).catch(error => console.log(error))

    $('.salv-editar-adiPag').click(e =>{
        const adiPagSelecionados = document.querySelectorAll('.edi-item-adiPag')
        let checkeds = [];
        let uncheckds = [];
        adiPagSelecionados.forEach(element =>{
            if(element.checked){
                // console.log(element.labels[0].innerText)
                // checkeds.push(element.labels[0].innerText)
                let id = element.id
                checkeds.push(id.replace('adiPag', ''))
            }else{
                let id = element.id
                uncheckds.push(id.replace('adiPag', ''))
            }
        })
        let data = {checkeds: checkeds, uncheckds: uncheckds}
    
        fetch('http://localhost:8000/src/assets/php/edit/save_adiPag.php', {
            method: 'POST',
            body: JSON.stringify(data)
        }).then(res => res.json()).then(response =>{
            console.log(response)
            if(!response.erro){
                toastr.success(response.mensagem)
            }else{
                toastr.error(response.mensagem)
            }
        }).catch(error => console.log(error))
    
    })
})

$('.li-excluir-adiPag').click(e =>{
    cadExcluirAdiPag()

    $('.excluirAdiPag').html('')
    fetch('http://localhost:8000/src/assets/php/edit/edit_adiPag.php').then(res => res.json()).then(response =>{
        // console.log(response)
        const adicionaisPag = response.adicionaisPag
        response.adicionaisPag.forEach(element =>{
            gerarExcluirAdiPag(element.id, element.sabor)
        })
        const excluirAdiPagImg = document.querySelectorAll('.excluir-adiPag')
        // console.log(excluirTipoImg)
        excluirAdiPagImg.forEach(e =>{
            e.addEventListener('click', element =>{
                let id = element.target.dataset.index_adipag
              
                fetch(`http://localhost:8000/src/assets/php/del/del_adiPag.php?id=${id}`)
                .then(res => res.json()).then(response =>{
                    console.log(response)

                    $('.excluirAdiPag').html('')
                    adicionaisPag.forEach(element =>{
                        if(element.id != id){
                            gerarExcluirAdiPag(element.id, element.sabor)
                        }
                    })

                    if(!response.erro){
                        toastr.success(response.mensagem)
                    }else{
                        toastr.error(response.mensagem)
                    }
                }).catch(error => console.log(error))
            })
        })
    }).catch(error => console.log(error))
})

//FIM DOS FETCHS DASHBOARD/LOGIN

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
let precoAcai

gerarCardsAcai()
gerarModal1()
gerarSelect()


horarioFuncionamento()
quantidadePedidos()
// $('.prox2').trigger('click')
// $('.finalizar').trigger('click')
$('.troco').hide()
$('.finalizar').hide()

function tituloVolumeModais(acais){
    //gera o título das modais e recebe o volume do acai selecionado
    const cards = document.querySelectorAll(".cardAcai")
    const tituloModais = document.querySelectorAll(".tituloModais")
    cards.forEach((e)=>{
        e.addEventListener("click", ()=>{
            qtdPedidos.value = 1
            removerChecked()
            tituloModais.forEach(element =>{
                element.innerHTML = `Açaí ${e.dataset.vol}`
            })
            volumeAcai = e.dataset.vol
            console.log(volumeAcai)
            acais.forEach(element =>{
                if(element.volume == e.dataset.vol){
                    limite = element.limiteAdi
                    limiteCremes = element.limiteCremes
                    precoAcai = element.preco
                }
            })
            
            $('.descCremes')[0].innerHTML = `Limite de cremes: ${limiteCremes}`
            $('.descAdi')[0].innerHTML = `Limite de adicionais: ${limite}`
            
        })
    })
}

//codigo antigo

// const cremes = document.querySelectorAll(".creme")
// const adicionais = document.querySelectorAll(".adi")
// const adicionaisPagos = document.querySelectorAll(".adiPag")

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
    const cremes = document.querySelectorAll(".creme")
    const adicionais = document.querySelectorAll(".adi")
    const adicionaisPagos = document.querySelectorAll(".adiPag")
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

    fetch('http://localhost:8000/src/assets/php/edit/edit_adiPag.php').then(res => res.json())
    .then(response =>{
        const saborAdicionaisPagos = response.adicionaisPag

        adicionaisPagos.forEach((e)=>{
            if(e.checked){
                let eId = e.id
                adiPagSelec++
                const label = document.querySelector(`[data-nome="${eId}"]`)
    
                saborAdicionaisPagos.map((element)=>{
                    if(element.sabor == label.innerHTML && label.innerHTML != "Sem adicional pago"){
                        aAdiPag.push(`${label.innerHTML} +${BRL(element.preco).format()}`)
                        precoAdiPag += element.preco
                        // console.log(label.innerHTML)
                    }
                })
    
                if (label.innerHTML == "Sem adicional pago") {
                    aAdiPag[0] = label.innerHTML
                    precoAdiPag = 0
                }
    
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

        gerarTabelaResumo()
        
    }).catch(error => console.log(error))

    // adicionaisPagos.forEach((e)=>{
    //     if(e.checked){
    //         let eId = e.id
    //         adiPagSelec++
    //         const label = document.querySelector(`[data-nome="${eId}"]`)

    //         saborAdicionaisPagos.map((element)=>{
    //             if(element.sabor == label.innerHTML && label.innerHTML != "Sem adicional pago"){
    //                 aAdiPag.push(`${label.innerHTML} +${element.precoString}`)
    //                 precoAdiPag += element.preco
    //                 // console.log(label.innerHTML)
    //             }
    //         })

    //         if (label.innerHTML == "Sem adicional pago") {
    //             aAdiPag[0] = label.innerHTML
    //             precoAdiPag = 0
    //         }

    //         // aAdiPag.push(label.innerHTML)

    //     }
    // })
    

    // if(cremesSelec == 0){
    //     stringCremes = 'Sem creme'
    // }else{
    //     stringCremes = aCremes.join(', ')
    // }
    
    // if(adiSelec == 0){
    //     stringAdicionais = 'Sem adicionais'
    // }else{
    //     stringAdicionais = aAdi.join(', ')
    // }
    
    // if(adiPagSelec == 0){
    //     stringAdicionaisPagos = 'Sem adicionais pagos'
    // }else{
    //     stringAdicionaisPagos = aAdiPag.join('; ')
    // }

    


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





function excluirDoCarrinho(){
    const excluir = document.querySelectorAll(".excluir")
    excluir.forEach(e =>{
        e.addEventListener("click", element =>{
            const exIndex = parseInt(element.target.dataset.index)
            carrinho.splice(exIndex, 1)
            
            const row = $(`.${exIndex}`)
            row.hide()

            // console.log(carrinho.length)
            // console.log(carrinho)
            if(carrinho.length == 0){
                $('.finalizar').hide()
                $('.enviar').hide()
                // $('.msgCarrinho').show()
                $('.corpoItens').append(`<div class="msgCarrinho" style="">
                <p class="fw-bold">Sem itens no carrinho</p>
            </div>`)
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
    // console.log(acais)

    fetch('http://localhost:8000/src/assets/php/edit/edit_acai.php').then(res => res.json())
    .then(response =>{
        // console.log(response)
        const acais = response.acais
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
                                <h5>${BRL(e.preco).format()}</h5>
                            </div>
                        </div>
                        <div class="card-text text-muted">Limite de cremes: ${e.limiteCremes}</div>
                        <div class="card-text text-muted">Limite de adicionais: ${e.limiteAdi}</div>
                    </div>
                </div>
            </div>  
        </div>`)
        })
        tituloVolumeModais(acais)

    }).catch(error => console.log(error))
    // acais.map((e)=>{
    //     $(colCards).append(`<div class="card cardAcai mb-3" data-bs-toggle="modal" data-bs-target="#exampleModal" data-vol="${e.volume}">
    //     <div class="row g-0">
    //         <div class="col-4 imgAcai rounded-start">
                
    //         </div>
    //         <div class="col-8">
    //             <div class="card-body">
    //                 <div class="row">
    //                     <div class="col d-flex justify-content-between">
    //                         <h5 class="card-title">Açaí ${e.volume}</h5>
    //                         <h5>${e.precoString}</h5>
    //                     </div>
    //                 </div>
    //                 <div class="card-text text-muted">Limite de cremes: ${e.limiteCremes}</div>
    //                 <div class="card-text text-muted">Limite de adicionais: ${e.limite}</div>
    //             </div>
    //         </div>
    //     </div>  
    // </div>`)
    // })
}

function gerarTiposAcai(){
    fetch('http://localhost:8000/src/assets/php/edit/edit_tipo.php').then(res => res.json())
    .then(response =>{
        // console.log(response.tipos)
        const tiposAcai = response.tipos
        tiposAcai.forEach((e, index) =>{
            if(!e.falta){
                $('.tiposAcai').append(`<li class="list-group-item"><div class="form-check">
                    <input class="form-check-input tipo" type="radio" name="flexRadioDefault" id="tipo${index}">
                    <label class="form-check-label" for="tipo${index}">
                    ${e.tipo}
                    </label>
                </div>
                </li>`)
            }else{
                $('.tiposAcai').append(`<li class="list-group-item"><div class="form-check">
                    <input class="form-check-input tipo" type="radio" name="flexRadioDefault" id="tipo${index}" disabled>
                    <label class="form-check-label" for="tipo${index}">
                    ${e.tipo}<span class="text-danger"> *Em falta</span>
                    </label>
                </div>
                </li>`)
            }
        
    })

    }).catch(error => console.log(error))

    // tiposAcai.forEach((e, index) =>{
    //     $('.tiposAcai').append(`<li class="list-group-item"><div class="form-check">
    //     <input class="form-check-input tipo" type="radio" name="flexRadioDefault" id="tipo${index}">
    //     <label class="form-check-label" for="tipo${index}">
    //       ${e}
    //     </label>
    //   </div>
    //   </li>`)
    // })
}

function gerarOpcoesCremes(){
    fetch('http://localhost:8000/src/assets/php/edit/edit_creme.php').then(res => res.json())
    .then(response =>{
        // console.log(response.cremes)
        const saborCremes = response.cremes

        saborCremes.map((e)=>{
            if(!e.falta){
                $(grupoCremes).append(`<li class="list-group-item">
                    <input class="form-check-input me-1 creme" type="checkbox" value="" id="saborCreme${e.id}">
                    <label class="form-check-label stretched-link" for="saborCreme${e.id}" data-nome="saborCreme${e.id}">${e.sabor}</label>
                </li>`)
            }else{
                $(grupoCremes).append(`<li class="list-group-item">
            <input class="form-check-input me-1 creme" type="checkbox" value="" id="saborCreme${e.id}" disabled>
            <label class="form-check-label stretched-link" for="saborCreme${e.id}" data-nome="saborCreme${e.id}">${e.sabor}
            <span class="text-danger">*Em falta</span></label>
          </li>`)
            }
            
        })
        const cremes = document.querySelectorAll(".creme")
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

    }).catch(error => console.log(error))

    // saborCremes.map((e)=>{
    //     $(grupoCremes).append(`<li class="list-group-item">
    //     <input class="form-check-input me-1 creme" type="checkbox" value="" id="${e.id}">
    //     <label class="form-check-label stretched-link" for="${e.id}" data-nome="${e.id}">${e.sabor}</label>
    //   </li>`)
    // })
}

function gerarOpcoesAdicionais(){
    fetch('http://localhost:8000/src/assets/php/edit/edit_adi.php').then(res => res.json())
    .then(response =>{
        // console.log(response.adicionais)
        const saborAdicionais = response.adicionais
        saborAdicionais.map((e)=>{
            if(!e.falta){
                $(grupoAdicionais).append(`<li class="list-group-item">
                    <input class="form-check-input me-1 adi" type="checkbox" value="" id="adi${e.id}">
                    <label class="form-check-label stretched-link" for="adi${e.id}" data-nome="adi${e.id}">${e.sabor}</label>
                </li>`)
            }else{
                $(grupoAdicionais).append(`<li class="list-group-item">
                    <input class="form-check-input me-1 adi" type="checkbox" value="" id="adi${e.id}" disabled>
                    <label class="form-check-label stretched-link" for="adi${e.id}" data-nome="adi${e.id}">${e.sabor}
                    <span class="text-danger"> *Em falta</span>
                    </label>
                </li>`)
            }
            
        })
        const adicionais = document.querySelectorAll(".adi")
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
        

    }).catch(error => console.log(error))

    // saborAdicionais.map((e)=>{
    //     $(grupoAdicionais).append(`<li class="list-group-item">
    //     <input class="form-check-input me-1 adi" type="checkbox" value="" id="${e.id}">
    //     <label class="form-check-label stretched-link" for="${e.id}" data-nome="${e.id}">${e.sabor}</label>
    //   </li>`)
    // })
}

function gerarOpcoesAdicionaisPagos(){

    fetch('http://localhost:8000/src/assets/php/edit/edit_adiPag.php').then(res => res.json())
    .then(response =>{
        // console.log(response.adicionaisPag)
        const adicionaisPag = response.adicionaisPag
        adicionaisPag.map((e)=>{
            if(!e.falta){
                $(grupoAdicionaisPagos).append(`<li class="list-group-item d-flex justify-content-between align-items-center">
                    <div>
                    <input class="form-check-input me-1 adiPag" type="checkbox" value="" id="adiPag${e.id}">
                    <label class="form-check-label stretched-link" for="adiPag${e.id}" data-nome="adiPag${e.id}">${e.sabor}</label>
                    </div>
                    <span class="badge bg-primary rounded-pill" data-preco="variavel">${BRL(e.preco).format()}</span>
                </li>`)
            }else{
                $(grupoAdicionaisPagos).append(`<li class="list-group-item d-flex justify-content-between align-items-center">
                    <div>
                    <input class="form-check-input me-1 adiPag" type="checkbox" value="" id="adiPag${e.id}" disabled>
                    <label class="form-check-label stretched-link" for="adiPag${e.id}" data-nome="adiPag${e.id}">${e.sabor}
                    <span class="text-danger"> *Em falta</span></label>
                    </div>
                    <span class="badge bg-primary rounded-pill" data-preco="variavel">${BRL(e.preco).format()}</span>
                </li>`)
            }
            
        })

    }).catch(error => console.log(error))

    // saborAdicionaisPagos.map((e)=>{
    //     $(grupoAdicionaisPagos).append(`<li class="list-group-item d-flex justify-content-between align-items-center">
    //     <div>
    //       <input class="form-check-input me-1 adiPag" type="checkbox" value="" id="${e.id}">
    //       <label class="form-check-label stretched-link" for="${e.id}" data-nome="${e.id}">${e.sabor}</label>
    //     </div>
    //     <span class="badge bg-primary rounded-pill" data-preco="variavel">${e.precoString}</span>
    //   </li>`)
    // })
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
    // let precoAcai = saberPrecoAcai()
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
    // console.log(somacarrinho)

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

    // console.log("limite cremes: ", limiteCremes)
    tipoResumo.innerHTML = tipoSelecionado
    mlResumo.innerHTML = `Açaí ${volumeAcai} <strong>${BRL(precoAcai).format()}</strong>`
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
        volume: `Açaí ${volumeAcai} - ${BRL(precoAcai).format()}`,
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
    const checkTipo = document.querySelectorAll('.tipo')
    for (let i = 0; i < checkTipo.length; i++) {
        const e = checkTipo[i];
        if(!e.disabled){
            e.checked = true
            break
        }
    }
    // checkTipo.forEach(e =>{
    //     if(!e.disabled){
    //         e.checked = true
    //     }
    // })
    // document.querySelector('#tipo0').checked = true
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
        <div class="row ${index}">
            <div class="col-md-12 itemTitle d-flex align-items-center justify-content-between">
                <span>(${e.qtd}x) ${e.volume}</span>
                <img class="excluir" data-index="${index}" src="./assets/img/trash3.svg" width="24"></img>
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

    let horaCompleta = `${horaAtual}:${(minutoAtual < 10)? "0" + minutoAtual : minutoAtual}`
    // console.log(`${semana[diaSemana].dia} ${semana[diaSemana].abre} - ${semana[diaSemana].fecha}`)
    const horarioFechar = semana[diaSemana].fecha
    const horarioAbrir = semana[diaSemana].abre
    // const horarioFechar = "20:00"
    console.log(horaCompleta)
    console.log(horarioFechar)
    console.log(horarioAbrir)
    console.log(horarioAbrir > horaCompleta)
    // horaCompleta >= horarioFechar || horarioAbrir > horaCompleta
    if(false){
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
        if(e.fechado){
            console.log(`${e.dia} é fechado`)
            if(diaSemana == index){
                $('.funcionamento').append(`<li class="list-group-item d-flex justify-content-between">
                <span><strong>${e.dia}</strong></span>
                <span><strong>Fechado</strong></span>
                </li>`)
            }else{
                $('.funcionamento').append(`<li class="list-group-item d-flex justify-content-between">
                <span>${e.dia}</span>
                <span>Fechado</span>
                </li>`)
            }
        }else{
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
        }
        
        
    })

}

function gerarEditarTipo(id, tipo, falta){
    if(!falta){
        $('.dispoTipo').append(`<li class="list-group-item">
        <input class="form-check-input edi-item-tipo" type="checkbox" value="" id="tipo${id}">
        <label class="form-check-label" for="tipo${id}">
            ${tipo}
        </label>
   </li>`)
    }else{
        $('.dispoTipo').append(`<li class="list-group-item">
        <input class="form-check-input edi-item-tipo" type="checkbox" value="" id="tipo${id}" checked>
        <label class="form-check-label" for="tipo${id}">
            ${tipo}
        </label>
   </li>`)        
    }
}

function gerarEditarCreme(id, sabor, falta){
    if(!falta){
        $('.dispoCreme').append(`<li class="list-group-item">
        <input class="form-check-input edi-item-creme" type="checkbox" value="" id="creme${id}">
        <label class="form-check-label" for="creme${id}">
            ${sabor}
        </label>
   </li>`)
    }else{
        $('.dispoCreme').append(`<li class="list-group-item">
        <input class="form-check-input edi-item-creme" type="checkbox" value="" id="creme${id}" checked>
        <label class="form-check-label" for="creme${id}">
            ${sabor}
        </label>
   </li>`)        
    }
}

function gerarEditarAdi(id, sabor, falta){
    if(!falta){
        $('.dispoAdi').append(`<li class="list-group-item">
        <input class="form-check-input edi-item-adi" type="checkbox" value="" id="adi${id}">
        <label class="form-check-label" for="adi${id}">
            ${sabor}
        </label>
   </li>`)
    }else{
        $('.dispoAdi').append(`<li class="list-group-item">
        <input class="form-check-input edi-item-adi" type="checkbox" value="" id="adi${id}" checked>
        <label class="form-check-label" for="adi${id}">
            ${sabor}
        </label>
   </li>`)        
    }
}

function gerarEditarAdiPag(id, sabor, falta){
    if(!falta){
        $('.dispoAdiPag').append(`<li class="list-group-item">
        <input class="form-check-input edi-item-adiPag" type="checkbox" value="" id="adiPag${id}">
        <label class="form-check-label" for="adiPag${id}">
            ${sabor}
        </label>
   </li>`)
    }else{
        $('.dispoAdiPag').append(`<li class="list-group-item">
        <input class="form-check-input edi-item-adiPag" type="checkbox" value="" id="adiPag${id}" checked>
        <label class="form-check-label" for="adiPag${id}">
            ${sabor}
        </label>
   </li>`)        
    }
}

function gerarExcluirTipo(id, tipo){
    $('.excluirTipo').append(`<li class="list-group-item d-flex align-items-center justify-content-between" data-li_tipo_excluir="${id}">
    <span>${tipo}</span>
    <img class="excluir-tipo" data-index_tipo="${id}" src="./assets/img/trash3.svg" width="24"></img>
    </li>`)
}

function gerarExcluirAcai(volume, id){
    $('.excluirAcai').append(`<li class="list-group-item d-flex align-items-center justify-content-between" data-li_acai_excluir="${id}">
    <span>${volume}</span>
    <img class="excluir-acai" data-index_acai="${id}" src="./assets/img/trash3.svg" width="24"></img>
    </li>`)
}

function gerarExcluirCreme(id, sabor){
    $('.excluirCreme').append(`<li class="list-group-item d-flex align-items-center justify-content-between" data-li_creme_excluir="${id}">
    <span>${sabor}</span>
    <img class="excluir-creme" data-index_creme="${id}" src="./assets/img/trash3.svg" width="24"></img>
    </li>`)
}

function gerarExcluirAdi(id, sabor){
    $('.excluirAdi').append(`<li class="list-group-item d-flex align-items-center justify-content-between" data-li_adi_excluir="${id}">
    <span>${sabor}</span>
    <img class="excluir-adi" data-index_adi="${id}" src="./assets/img/trash3.svg" width="24"></img>
    </li>`)
}

function gerarExcluirAdiPag(id, sabor){
    $('.excluirAdiPag').append(`<li class="list-group-item d-flex align-items-center justify-content-between" data-li_adiPag_excluir="${id}">
    <span>${sabor}</span>
    <img class="excluir-adiPag" data-index_adiPag="${id}" src="./assets/img/trash3.svg" width="24"></img>
    </li>`)
}

function cardNovoTipo(){
    $('.mainCol').html('')
    $('.mainCol').append(htmlNovoTipo)
}

function cardDisponiTipo(){
    $('.mainCol').html('')
    $('.mainCol').append(htmlDisponiTipo)
}

function cadExcluirTipo(){
    $('.mainCol').html('')
    $('.mainCol').append(htmlExcluirTipo)   
}

function cardNovoAcai(){
    $('.mainCol').html('')
    $('.mainCol').append(htmlNovoAcai)
}

function cardExcluirAcai(){
    $('.mainCol').html('')
    $('.mainCol').append(htmlExcluirAcai)
}

function cardNovoCreme(){
    $('.mainCol').html('')
    $('.mainCol').append(htmlNovoCreme)
}

function cardDisponiCreme(){
    $('.mainCol').html('')
    $('.mainCol').append(htmlDisponiCreme)
}

function cadExcluirCreme(){
    $('.mainCol').html('')
    $('.mainCol').append(htmlExcluirCreme)   
}

function cardNovoAdi(){
    $('.mainCol').html('')
    $('.mainCol').append(htmlNovoAdi)
}

function cardDisponiAdi(){
    $('.mainCol').html('')
    $('.mainCol').append(htmlDisponiAdi)
}

function cadExcluirAdi(){
    $('.mainCol').html('')
    $('.mainCol').append(htmlExcluirAdi)   
}

function cardNovoAdiPag(){
    $('.mainCol').html('')
    $('.mainCol').append(htmlNovoAdiPag)

}

function cardDisponiAdiPag(){
    $('.mainCol').html('')
    $('.mainCol').append(htmlDisponiAdiPag)
}

function cadExcluirAdiPag(){
    $('.mainCol').html('')
    $('.mainCol').append(htmlExcluirAdiPag)   
}
