// Cria uma linha
function criarLinha() {
  // Variáveis
  let linha = document.createElement("div");
  let nome = document.createElement("input");
  let link = document.createElement("input");
  let botao_add = document.createElement("button");
  let botao_sub = document.createElement("button");

  // Atributos
  linha.className = "linha";
  nome.type = "text";
  nome.placeholder = "Nome";
  link.type = "text";
  link.placeholder = "Link";
  botao_add.className = "botao botao_add";
  botao_add.textContent = "+";
  botao_add.addEventListener("click", criarLinha);
  botao_sub.className = "botao botao_sub";
  botao_sub.textContent = "-";
  botao_sub.addEventListener("click", delLinha);

  // Inserindo
  linha.appendChild(nome);
  linha.appendChild(link);
  linha.appendChild(botao_add);
  linha.appendChild(botao_sub);
  document.getElementsByClassName("container_linhas")[0].appendChild(linha);
}

// Deleta uma linha
function delLinha(event) {
  event.target.parentElement.remove();
}

// Adiciona função aos botões
const botoes = document.querySelectorAll("button");

for (var i = 0; i < botoes.length; i++) {
  botoes[i].addEventListener("click", criarLinha);
}
