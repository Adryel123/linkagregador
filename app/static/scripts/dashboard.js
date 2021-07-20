// Cria uma linha
function criarLinha() {
  // Cria o elemento linha
  const linha = document.createElement("div");
  linha.className = "linha";
  linha.innerHTML = `
    <input type="text" class="name" placeholder="Nome" />
    <input type="text" class="url" placeholder="Link" />
    <button class="botao botao_sub">-</button>
  `;

  // Adiciona evento de remoção de linha ao botão
  linha.querySelector(".botao_sub").addEventListener("click", delLinha);

  // Adiciona a linha ao documento
  document.querySelector(".container_linhas").appendChild(linha);
}

// Deleta uma linha
function delLinha(event) {
  event.target.parentElement.remove();

  // Ao menos uma linha
  if (!document.querySelector(".linha")) {
    criarLinha();
  }
}

// Retorna uma lista com cada nome e url
function capturarDados() {
  // Array com as linhas
  const linhas = document.querySelector(".container_linhas").childNodes;

  // Para cada linha, captura nome e url
  const links = [];
  linhas.forEach((linha) => {
    const nome = linha.querySelector(".name").value;
    const url = linha.querySelector(".url").value;
    links.push({ nome, url });
  });

  return links;
}

// Faz uma requisição PUT para o endereço /edit
// Passa no corpo os dados e o usuário
function salvarDados() {
  const dados = capturarDados();

  fetch("/save", {
    method: "PUT",
    body: { ...dados},
  }).then(console.log);
}

// Adiciona função ao botão de adicionar linha
document.querySelector(".botao_add").addEventListener("click", criarLinha);

// Adiciona função ao botão de salvar
document.querySelector(".botao_salvar").addEventListener("click", salvarDados);

// Cria a primeira linha
criarLinha();