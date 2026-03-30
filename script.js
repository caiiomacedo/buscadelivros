async function buscarLivros() {
    const termo = document.getElementById('busca').value;

    try {
} catch (erro) {
   alert("Erro ao buscar livros");
}

    if (!termo) {
        alert('Digite algo!');
        return;
    }

    const resposta = await fetch(`https://openlibrary.org/search.json?q=${termo}`);
    const dados = await resposta.json();

    mostrarLivros(dados.docs.slice(0, 5));
}

/**
 * Mostra os livros na tabela
 * @param {Array} livros
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
 * Salva no localStorage
 * @param {Array} livros
 */
function salvarLocal(livros) {
    localStorage.setItem('livros', JSON.stringify(livros));
}

function carregarLocal() {
    const dados = JSON.parse(localStorage.getItem('livros'));

    if (dados) {
        mostrarLivros(dados);
    }
}

carregarLocal();

function remover(index) {
    let livros = JSON.parse(localStorage.getItem('livros'));

    livros.splice(index, 1);

    localStorage.setItem('livros', JSON.stringify(livros));

    mostrarLivros(livros);
}