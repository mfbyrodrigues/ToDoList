const agora = new Date();

window.onload = function () {

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
};

const formTarefa = document.getElementById ("form-tarefa");
let caixasMarcadas = document.getElementsByClassName ("marcador");
const listaTarefas = [];

let listaVazia = document.getElementById ("lista-vazia");
const copiaListaVazia = listaVazia;

formTarefa.addEventListener ("submit", function (add) {

    add.preventDefault();

    const nome = document.getElementById ("nome-tarefa").value;
    const meses = ["janeiro", "fevereiro", "março", "abril", "maio", "junho", "julho", "agosto", "stembro", "outubro", "novembro", "dezembro"];
    const data = `${agora.getDate()} de ${meses[agora.getMonth()]} de ${agora.getFullYear()}`;

    const tarefa = {
        nome,
        data,
        feita: false,
    };

    listaTarefas.push(tarefa);

    if (listaVazia) {
        listaVazia.remove();
    }

    atualizarContador();

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

    const lixeira = document.createElement ("i");
    lixeira.className = "fa-solid fa-trash fa-lg";
    lixeira.style.color = "#de015d";

    novaCaixa.append (conteudo, lixeira);
    caixaPrincipal.append (novaCaixa);

    atualizarEventos();
    formTarefa.reset();
});

function atualizarContador() {

    const concluidas = listaTarefas.filter (t => t.feita).length;
    const contador = document.getElementById ("contador");

    if (contador) {
        contador.innerHTML = `<h4> ${concluidas} de ${listaTarefas.length} concluídas </h4>`;
    }
}

function atualizarEventos() {

    caixasMarcadas = document.getElementsByClassName ("marcador");

    for (let i = 0; i < caixasMarcadas.length; i++) {

        caixasMarcadas[i].onchange = function () {

        listaTarefas[i].feita = this.checked;
        const tarefaCaixa = this.closest(".caixa-tarefa");
        const titulo = tarefaCaixa.querySelector("h4");
        const texto = tarefaCaixa.querySelector("p");

        if (this.checked) {
            tarefaCaixa.style.backgroundColor = "#92cda9ff";
            tarefaCaixa.style.border = "1px solid #018f60ff";
            titulo.style.color = "#008f5fff";

            texto.textContent = `Concluída em: ${listaTarefas[i].data}`;
        }
        
        else {
            tarefaCaixa.style.backgroundColor = "";
            tarefaCaixa.style.border = "";
            titulo.style.color = "";

            texto.textContent = `Criada em: ${listaTarefas[i].data}`;
        }
        
        atualizarContador();
        };
  }

  const lixeiras = document.querySelectorAll (".fa-trash");

  lixeiras.forEach ((lixeira, index) => {

        lixeira.onclick = function () {

        const caixa = this.closest (".caixa-tarefa");

        caixa.remove();
        listaTarefas.splice (index, 1);
        atualizarContador();

        if (listaTarefas.length === 0) {

            const caixaPrincipal = document.getElementById ("caixa-principal");

            caixaPrincipal.append (copiaListaVazia);
            document.getElementById ("contador").innerHTML = "";
        }

        atualizarEventos();
        };
    });
}