document.addEventListener('DOMContentLoaded', async () => {
    try {
        const urlParams = new URLSearchParams(window.location.search);
        const livroId = urlParams.get('id');

        if (livroId) {
            const livroRef = firebase.database().ref(`livros/${livroId}`);
            const snapshot = await livroRef.once('value');

            const livroData = snapshot.val();

            if (livroData) {
                const bookForm = document.getElementById('book-form');
                bookForm.innerHTML = `
                    <div class="form-group">
                        <label for="titulo">Título:</label>
                        <input type="text" class="form-control" id="titulo" placeholder="Título do Livro" value="${livroData.titulo}">
                    </div>

                    <div class="form-group">
                        <label for="autor">Autor(es):</label>
                        <input type="text" class="form-control" id="autor" placeholder="Autor(es) do Livro" required value="${livroData.autor}">
                    </div>

                    <div class="form-group">
                        <label for="sinopse">Sinopse:</label>
                        <textarea class="form-control" id="sinopse" rows="3" placeholder="Sinopse do Livro" required>${livroData.sinopse}</textarea>
                    </div>

                    <div class="form-group">
                        <label for="genero">Gênero:</label>
                        <input type="text" class="form-control" id="genero" placeholder="Gênero do Livro" required value="${livroData.genero}">
                    </div>

                    <div class="form-group">
                        <label for="preco">Preço:</label>
                        <input type="text" class="form-control" id="preco" placeholder="Preço do Livro" required value="${livroData.preco}">
                    </div>

                    <div class="form-group">
                        <label for="formato">Formato:</label>
                        <select class="form-control" id="formato" required>
                            <option ${livroData.formato === 'Impresso' ? 'selected' : ''}>Impresso</option>
                            <option ${livroData.formato === 'Ebook' ? 'selected' : ''}>Ebook</option>
                        </select>
                    </div>

                    <div class="form-group">
                        <label for="isbn">ISBN:</label>
                        <input type="number" class="form-control" id="isbn" placeholder="ISBN do Livro" required value="${livroData.isbn}">
                    </div>

                    <button type="button" class="btn btn-primary" onclick="atualizarLivro('${livroId}')">Atualizar</button>
                `;
            } else {
                console.log('Livro não encontrado no banco de dados.');
            }
        } else {
            console.log('ID do livro não fornecido.');
        }
    } catch (error) {
        console.error('Erro ao obter dados do livro para edição:', error);
    }
});

function atualizarLivro(livroId) {
    const titulo = document.getElementById('titulo').value;
    const autor = document.getElementById('autor').value;
    const sinopse = document.getElementById('sinopse').value;
    const genero = document.getElementById('genero').value;
    const preco = document.getElementById('preco').value;
    const formato = document.getElementById('formato').value;
    const isbn = document.getElementById('isbn').value;

    firebase.database().ref(`livros/${livroId}`).update
}