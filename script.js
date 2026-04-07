/**
 * Busca livros na API do Open Library conforme digitado pelo usuário.
 * * @returns {Promise<void>} Uma promise vazia, indicando a conclusão da busca.
 */
async function buscarLivros() {
    const termo = document.getElementById('busca').value;

    if (!termo) {
    Swal.fire({
        title: 'Campo obrigatório',
        text: 'Por favor, digite o nome de um livro',
        icon: 'warning',
        confirmButtonText: 'OK'
    });
    return;
}

    try {
        const resposta = await fetch(`https://openlibrary.org/search.json?q=${termo}`);
        const dados = await resposta.json();
        mostrarLivros(dados.docs.slice(0, 5));
    } catch (erro) {
        alert("Erro ao buscar livros");
    }
}

/**
 * Renderiza a lista de livros recebida na tabela HTML da página.
 * * @param {Array} livros Um array contendo os objetos dos livros a serem exibidos.
 * @returns {void} A função não tem retorno.
 */
function mostrarLivros(livros) {
    const tabela = document.getElementById('tabela');
    tabela.innerHTML = '';

    livros.forEach((livro, index) => {
        const linha = document.createElement('tr');

        linha.innerHTML = `
            <td>${livro.title}</td>
            <td>${livro.author_name?.[0] || "N/A"}</td>
            <td>${livro.first_publish_year || "N/A"}</td>
            <td>${livro.edition_count}</td>
            <td><button onclick="remover(${index})">Excluir</button></td>
        `;

        tabela.appendChild(linha);
    });

    salvarLocal(livros);
}

/**
 * Salva a lista atual de livros no armazenamento local (localStorage) do navegador.
 * * @param {Array} livros Um array de livros que será convertido em texto (JSON) e salvo.
 * @returns {void} A função não tem retorno.
 */
function salvarLocal(livros) {
    localStorage.setItem('livros', JSON.stringify(livros));
}

/**
 * Busca os dados salvos no localStorage
 * * @returns {void} A função não tem retorno.
 */
function carregarLocal() {
    const dados = JSON.parse(localStorage.getItem('livros'));

    if (dados) {
        mostrarLivros(dados);
    }
}

carregarLocal();

/**
 * Remove um livro específico da lista 
 * * @param {number} index A posição (índice) do livro dentro do array que deve ser excluído.
 * @returns {void} A função não tem retorno.
 */
function remover(index) {
    let livros = JSON.parse(localStorage.getItem('livros'));

    livros.splice(index, 1);

    localStorage.setItem('livros', JSON.stringify(livros));

    mostrarLivros(livros);
}