// Criação de um objeto para instanciar de acordo com os horários de acesso do usuário
const agora = new Date();

// Minhas variáveis príncipais, juntamente com um array 
const formTarefa = document.getElementById ("form-tarefa");
let caixasMarcadas = document.getElementsByClassName ("marcador");
let listaVazia = document.getElementById ("lista-vazia");
const listaTarefas = JSON.parse(localStorage.getItem("tarefas")) || [];
const copiaListaVazia = listaVazia;

window.onload = function () {

    // Captura a hora atual e define a saudação personalizada
    const hora = agora.getHours();
    const saudacao = document.getElementById ("saudacao");

    if (hora >= 0 && hora < 12) {
        saudacao.innerHTML = "<p> Bom dia, <strong> Maria Fernanda! </strong> ☀️ </p>";
    }
    
    else if (hora < 18) {
        saudacao.innerHTML = "<p> Boa tarde, <strong> Maria Fernanda! </strong> 🌤️ </p>";
    }
    
    else {
        saudacao.innerHTML = "<p> Boa noite, <strong> Maria Fernanda! </strong> 🌙 </p>";
    }

    // Recria as tarefas salvas no LocalStorage ao carregar a página
    for (let i = 0; i < listaTarefas.length; i++) {
        adicionarTarefa(listaTarefas[i])
    }

    atualizarStorage();

    // Remove o aviso de quando não tem nenhuma tarefa
    if (listaTarefas.length != 0) {
        if (listaVazia) {
            listaVazia.remove();
        }
    }
};

// Envio do formulário
formTarefa.addEventListener ("submit", function (add) {

    // Evita que o formulário recarregue a página
    add.preventDefault();

    // Nome da tarefa que foi digitada pelo usuário
    const nome = document.getElementById ("nome-tarefa").value;

    // Array com os meses do ano, apenas para deixar a data mais bonitinha :)
    const meses = [
    "janeiro", "fevereiro", "março", "abril", "maio", "junho",
    "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"
    ];

    // Data completa que foi formada
    const data = `${agora.getDate()} de ${meses[agora.getMonth()]} de ${agora.getFullYear()}`;

    // Objeto tarefa com seus principais dados
    const tarefa = {
        nome,
        data,
        feita: false,
    };

    // Adiciona nova tarefa à lista
    listaTarefas.push(tarefa);

    // Remove o aviso de quando não tem nenhuma tarefa
    if (listaTarefas.length != 0) {
        if (listaVazia) {
            listaVazia.remove();
        }
    }

    atualizarContador();
    adicionarTarefa(tarefa);
    atualizarStorage();
});

// Adiciona a tarefa na tela
function adicionarTarefa (tarefa) {

    const caixaPrincipal = document.getElementById ("caixa-principal");
    const novaCaixa = document.createElement ("div");
    novaCaixa.className = "caixa-tarefa";
    novaCaixa.id = `tarefa${listaTarefas.length}`;

    const conteudo = document.createElement ("div");
    conteudo.className = "conteudo-tarefa";

    const marcador = document.createElement ("input");
    marcador.type = "checkbox";
    marcador.className = "marcador";

    const texto = document.createElement ("div");
    texto.className = "texto-tarefa";

    const titulo = document.createElement ("h4");
    titulo.textContent = tarefa.nome;

    const descricao = document.createElement ("p");
    descricao.textContent = `Criada em: ${tarefa.data}`;

    texto.append (titulo, descricao);
    conteudo.append (marcador, texto);

    // Estiliza a lixeirinha
    const lixeira = document.createElement ("i");
    lixeira.className = "fa-solid fa-trash fa-lg";
    lixeira.style.color = "#de015d";

    novaCaixa.append (conteudo, lixeira);
    caixaPrincipal.append (novaCaixa);

    
    // Se a tarefa estava concluída, aplica o estilo verde
    if (tarefa.feita) {
        novaCaixa.style.backgroundColor = "#92cda9ff";
        novaCaixa.style.border = "1px solid #018f60ff";
        titulo.style.color = "#008f5fff";
    }
    
    // Deixa a tarefa marcada como concluída salva
    marcador.checked = tarefa.feita;

    atualizarTarefas();
    formTarefa.reset();
}

// Conta quantas tarefas estão concluídas e atualiza o contador na tela
function atualizarContador() {

    const concluidas = listaTarefas.filter (i => i.feita).length;
    const contador = document.getElementById ("contador");

    if (contador) {

        contador.innerHTML = `<h4> ${concluidas} de ${listaTarefas.length} concluídas </h4>`;
        contador.innerHTML = `<h4>${concluidas} de ${listaTarefas.length} <span style="color: #008f5f;"> concluídas </span></h4>`;
    }
}

function atualizarTarefas() {

    caixasMarcadas = document.getElementsByClassName ("marcador");

    for (let i = 0; i < caixasMarcadas.length; i++) {

        caixasMarcadas[i].onchange = function () {

        // Tarefa feita ou não
        listaTarefas[i].feita = this.checked;

        const tarefaCaixa = this.closest(".caixa-tarefa");
        const titulo = tarefaCaixa.querySelector("h4");
        const texto = tarefaCaixa.querySelector("p");
        
        // Altera o estilo da tarefa quando marcada como concluída
        if (this.checked) {

            tarefaCaixa.style.backgroundColor = "#92cda9ff";
            tarefaCaixa.style.border = "1px solid #018f60ff";
            titulo.style.color = "#008f5fff";

            texto.textContent = `Concluída em: ${listaTarefas[i].data}`;

            atualizarStorage();
        }
        
        else {
            
            tarefaCaixa.style.backgroundColor = "";
            tarefaCaixa.style.border = "";
            titulo.style.color = "";

            texto.textContent = `Criada em: ${listaTarefas[i].data}`;

            atualizarStorage();
        }
        
        atualizarContador();
        };
    }

  const lixeiras = document.querySelectorAll (".fa-trash");

  lixeiras.forEach ((lixeira, index) => {

        lixeira.onclick = function () {

        // Remove a tarefa
        const caixa = this.closest (".caixa-tarefa");
        caixa.remove();
        listaTarefas.splice (index, 1);

        atualizarContador();

        // Se a lista ficar vazia, mostra o de quando não tem nenhuma tarefa
        if (listaTarefas.length === 0) {

            const caixaPrincipal = document.getElementById ("caixa-principal");

            caixaPrincipal.append (copiaListaVazia);
            document.getElementById ("contador").innerHTML = "";
        }

        atualizarTarefas();
        atualizarStorage();
        };
    });
}

function atualizarStorage() {
    localStorage.setItem ("tarefas", JSON.stringify (listaTarefas));
}
