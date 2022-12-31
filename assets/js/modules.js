//tiposAcai, acais, saborCremes, saborAdicionais, saborAdicionaisPagos, bairros2
export const semana = [

{

    dia:"Domingo",

    abre:"14:00",

    fecha:"22:30"

},

{

    dia:"Segunda-Feira",

    abre:"18:30",

    fecha:"22:30"

},

{

    dia:"Terça-Feira",

    abre:"18:30",

    fecha:"22:30",

    fechado: true

},

{

    dia:"Quarta-Feira",

    abre:"18:30",

    fecha:"22:30"

},

{

    dia:"Quinta-Feira",

    abre:"18:30",

    fecha:"22:30"

},

{

    dia:"Sexta-Feira",

    abre:"18:30",

    fecha:"22:30"

},

{

    dia:"Sábado",

    abre:"14:00",

    fecha:"22:30"

} 

]

export const htmlNovoTipo = `<div class="card shadow">

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

</div>`



export const htmlDisponiTipo = `<div class="card shadow">

<div class="card-body">

    <h5 class="card-title">

        Editar disponibilidade

    </h5>

    <p class="card-text">

        Marque os que estão em <strong>falta</strong>.

    </p>
    <div class="loading d-flex justify-content-center align-items-center">
              <div class="spinner-border text-success" role="status">
                <span class="visually-hidden">Loading...</span>
              </div>
            </div>
    <ul class="list-group dispoTipo mb-3">

    </ul>

    <button type="button" class="btn btn-primary salv-editar-tipo">Salvar</button>

</div>

</div>`



export const htmlExcluirTipo = `<div class="card shadow">

<div class="card-body">

    <h5 class="card-title">

        Excluir tipos

    </h5>
    <div class="loading d-flex justify-content-center align-items-center">
              <div class="spinner-border text-success" role="status">
                <span class="visually-hidden">Loading...</span>
              </div>
            </div>
    <ul class="list-group excluirTipo mb-3">

        

    </ul>

</div>

</div>`



export const htmlNovoAcai = `<div class="card shadow">

<div class="card-body">

    <h5 class="card-title">

        Adicionar novo açaí

    </h5>

    <form class="formAddAcai">

        <div class="mb-3">

            <label for="cadAcai" class="form-label">Volume do açaí</label>

            <input type="text" class="form-control" name="cadAcai" placeholder="Ex: 400ml" id="cadAcai" required>

        </div>

        <div class="mb-3">

            <label for="cadPrecoAcai" class="form-label">Preço do açaí</label>

            <input type="text" class="form-control" name="cadPrecoAcai" placeholder="Ex: R$ 12,00" id="cadPrecoAcai" required>

        </div>

        <div class="mb-3">

            <label for="cadLimAdiAcai" class="form-label">Limite de adicionais</label>

            <input type="number" class="form-control" name="cadLimAdiAcai" placeholder="Ex: 5" id="cadLimAdiAcai" required>

        </div>

        <div class="mb-3">

            <label for="cadLimCremeAcai" class="form-label">Limite de cremes</label>

            <input type="number" class="form-control" name="cadLimCremeAcai" placeholder="Ex: 5" id="cadLimCremeAcai" required>

        </div>



        <button type="submit" class="btn btn-primary addAcai">Adicionar</button>

    </form>

</div>

</div>`



export const htmlExcluirAcai = `<div class="card shadow">

<div class="card-body">

    <h5 class="card-title">

        Excluir açaís

    </h5>
    <div class="loading d-flex justify-content-center align-items-center">
              <div class="spinner-border text-success" role="status">
                <span class="visually-hidden">Loading...</span>
              </div>
            </div>
    <ul class="list-group excluirAcai mb-3">

        

    </ul>

</div>

</div>`



export const htmlNovoCreme = `<div class="card shadow">

<div class="card-body">

    <h5 class="card-title">

        Adicionar novo creme

    </h5>

    <form class="formAddCreme">

        <div class="mb-3">

            <label for="cadCreme" class="form-label">Sabor do creme</label>

            <input type="text" class="form-control" name="cadCreme" placeholder="Ex: Creme de Ninho" id="cadCreme" required>

        </div>

        <div class="mb-3 form-check">

            <input type="checkbox" name="faltaCreme" class="form-check-input" id="faltaCreme">

            <label class="form-check-label" for="faltaCreme">Está em falta</label>

        </div>

        <button type="submit" class="btn btn-primary addCreme">Adicionar</button>

    </form>

</div>

</div>`



export const htmlDisponiCreme = `<div class="card shadow">

<div class="card-body">

    <h5 class="card-title">

        Editar disponibilidade

    </h5>

    <p class="card-text">

        Marque os que estão em <strong>falta</strong>.

    </p>
    <div class="loading d-flex justify-content-center align-items-center">
              <div class="spinner-border text-success" role="status">
                <span class="visually-hidden">Loading...</span>
              </div>
            </div>
    <ul class="list-group dispoCreme mb-3">

    </ul>

    <button type="button" class="btn btn-primary salv-editar-creme">Salvar</button>

</div>

</div>`



export const htmlExcluirCreme = `<div class="card shadow">

<div class="card-body">

    <h5 class="card-title">

        Excluir cremes

    </h5>
    <div class="loading d-flex justify-content-center align-items-center">
              <div class="spinner-border text-success" role="status">
                <span class="visually-hidden">Loading...</span>
              </div>
            </div>
    <ul class="list-group excluirCreme mb-3">

        

    </ul>

</div>

</div>`



export const htmlNovoAdi = `<div class="card shadow">

<div class="card-body">

    <h5 class="card-title">

        Adicionar novo adicional

    </h5>

    <form class="formAddAdi">

        <div class="mb-3">

            <label for="cadAdi" class="form-label">Sabor do adicional</label>

            <input type="text" class="form-control" name="cadAdi" placeholder="Ex: Gotas de Chocolate" id="cadAdi" required>

        </div>

        <div class="mb-3 form-check">

            <input type="checkbox" name="faltaAdi" class="form-check-input" id="faltaAdi">

            <label class="form-check-label" for="faltaAdi">Está em falta</label>

        </div>

        <button type="submit" class="btn btn-primary addAdi">Adicionar</button>

    </form>

</div>

</div>`



export const htmlDisponiAdi = `<div class="card shadow">

<div class="card-body">

    <h5 class="card-title">

        Editar disponibilidade

    </h5>

    <p class="card-text">

        Marque os que estão em <strong>falta</strong>.

    </p>
    <div class="loading d-flex justify-content-center align-items-center">
              <div class="spinner-border text-success" role="status">
                <span class="visually-hidden">Loading...</span>
              </div>
            </div>
    <ul class="list-group dispoAdi mb-3">

    </ul>

    <button type="button" class="btn btn-primary salv-editar-adi">Salvar</button>

</div>

</div>`



export const htmlExcluirAdi = `<div class="card shadow">

<div class="card-body">

    <h5 class="card-title">

        Excluir adicionais

    </h5>
    <div class="loading d-flex justify-content-center align-items-center">
              <div class="spinner-border text-success" role="status">
                <span class="visually-hidden">Loading...</span>
              </div>
            </div>
    <ul class="list-group excluirAdi mb-3">

        

    </ul>

</div>

</div>`



export const htmlNovoAdiPag = `<div class="card shadow">

<div class="card-body">

    <h5 class="card-title">

        Adicionar novo adicional pago

    </h5>

    <form class="formAddAdiPag">

        <div class="mb-3">

            <label for="cadAdiPag" class="form-label">Sabor do adicional pago</label>

            <input type="text" class="form-control" name="cadAdiPag" placeholder="Ex: Leite em Pó" id="cadAdiPag" required>

        </div>

        <div class="mb-3">

            <label for="cadPrecoAdiPag" class="form-label">Preço do adicional</label>

            <input type="text" class="form-control" name="cadPrecoAdiPag" placeholder="Ex: R$ 1,50" id="cadPrecoAdiPag" required>

        </div>

        <div class="mb-3 form-check">

            <input type="checkbox" name="faltaAdiPag" class="form-check-input" id="faltaAdiPag">

            <label class="form-check-label" for="faltaAdiPag">Está em falta</label>

        </div>



        <button type="submit" class="btn btn-primary addAdiPag">Adicionar</button>

    </form>

</div>

</div>`



export const htmlDisponiAdiPag = `<div class="card shadow">

<div class="card-body">

    <h5 class="card-title">

        Editar disponibilidade

    </h5>

    <p class="card-text">

        Marque os que estão em <strong>falta</strong>.

    </p>
    <div class="loading d-flex justify-content-center align-items-center">
              <div class="spinner-border text-success" role="status">
                <span class="visually-hidden">Loading...</span>
              </div>
            </div>

    <ul class="list-group dispoAdiPag mb-3">

    </ul>

    <button type="button" class="btn btn-primary salv-editar-adiPag">Salvar</button>

</div>

</div>`



export const htmlExcluirAdiPag = `<div class="card shadow">

<div class="card-body">

    <h5 class="card-title">

        Excluir adicionais pagos

    </h5>

    <div class="loading d-flex justify-content-center align-items-center">
              <div class="spinner-border text-success" role="status">
                <span class="visually-hidden">Loading...</span>
              </div>
            </div>
    <ul class="list-group excluirAdiPag mb-3">

        

    </ul>

</div>

</div>`

export const htmlNovoBairro = `<div class="card shadow">

<div class="card-body">

    <h5 class="card-title">

        Adicionar novo bairro

    </h5>

    <form class="formAddBairro">

        <div class="mb-3">

            <label for="cadBairro" class="form-label">Nome do bairro</label>

            <input type="text" class="form-control" name="cadBairro" placeholder="Ex: FOMENTO" id="cadBairro" required>

        </div>

        <div class="mb-3">

            <label for="cadPrecoBairro" class="form-label">Preço do frete</label>

            <input type="text" class="form-control" name="cadPrecoBairro" placeholder="Ex: R$ 2,00" id="cadPrecoBairro" required>

        </div>

        <button type="submit" class="btn btn-primary addBairro">Adicionar</button>

    </form>

</div>

</div> `

export const htmlExcluirBairro = `<div class="card shadow">

<div class="card-body">

    <h5 class="card-title">

        Excluir bairros

    </h5>

    <div class="loading d-flex justify-content-center align-items-center">
              <div class="spinner-border text-success" role="status">
                <span class="visually-hidden">Loading...</span>
              </div>
            </div>
    <ul class="list-group excluirBairro mb-3">

        
    </ul>

</div>

</div> `