// Atualize os dados do livro no banco de dados
function atualizarLivro(livroId) {
    // Obtenha os valores atualizados do formulário
    const titulo = document.getElementById('titulo').value;
    const autor = document.getElementById('autor').value;
    const sinopse = document.getElementById('sinopse').value;
    const genero = document.getElementById('genero').value;
    const preco = document.getElementById('preco').value;
    const formato = document.getElementById('formato').value;
    const isbn = document.getElementById('isbn').value;

    firebase.database().ref(`livros/${livroId}`).update({
        titulo: titulo,
        autor: autor,
        sinopse: sinopse,
        genero: genero,
        preco: preco,
        formato: formato,
        isbn: isbn
    })
    .then(() => {
        alert('Livro atualizado com sucesso!');
        window.location.href = 'list-dados.html';
    })
    .catch((error) => {
        console.error('Erro ao atualizar o livro:', error);
        alert('Erro ao atualizar o livro. Tente novamente.');
    });
}
