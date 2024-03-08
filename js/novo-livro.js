document.getElementById('book-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const titulo = document.getElementById('titulo').value;
    const autor = document.getElementById('autor').value;
    const sinopse = document.getElementById('sinopse').value;
    const genero = document.getElementById('genero').value;
    const preco = document.getElementById('preco').value;
    const formato = document.getElementById('formato').value;
    const isbn = document.getElementById('isbn').value;

    try {
        const livroRef = firebase.database().ref('livros').push();
        const livroKey = livroRef.key; 
        await livroRef.set({
            uid: livroKey, 
            titulo,
            autor,
            sinopse,
            genero,
            preco,
            formato,
            isbn,
            createdAt: firebase.database.ServerValue.TIMESTAMP,
        });

        alert('Livro cadastrado com sucesso!');
        window.location.href = 'list-dados.html';
    } catch (error) {
        console.error('Erro ao cadastrar livro:', error);
        alert('Erro ao cadastrar livro. Tente novamente.');
    }
});

document.addEventListener('DOMContentLoaded', async () => {
    try {
        const livrosRef = firebase.database().ref('livros');

        const snapshot = await livrosRef.once('value');

        const livrosData = snapshot.val();

        if (livrosData) {
            Object.entries(livrosData).forEach(([key, livro]) => {
                console.log(`ID: ${key}`);
                console.log(`Título: ${livro.titulo}`);
                console.log(`Autor: ${livro.autor}`);
                console.log(`Sinopse: ${livro.sinopse}`);
                console.log(`Gênero: ${livro.genero}`);
                console.log(`Preço: ${livro.preco}`);
                console.log(`Formato: ${livro.formato}`);
                console.log(`ISBN: ${livro.isbn}`);
                console.log('-----------------------');
            });
        } else {
            console.log('Nenhum livro encontrado no banco de dados.');
        }
    } catch (error) {
        console.error('Erro ao obter dados do banco de dados:', error);
    }
});
