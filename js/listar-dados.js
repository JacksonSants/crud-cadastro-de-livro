document.addEventListener('DOMContentLoaded', async () => {
    try {
        const snapshot = await livrosRef.once('value');
        const livrosData = snapshot.val();
        if (livrosData) {
            const tbody = document.getElementById('books-table-body');
            Object.entries(livrosData).forEach(([key, livro]) => {
                const newRow = document.createElement('tr');
                newRow.innerHTML = `
                    <td>${livro.titulo}</td>
                    <td>${livro.autor}</td>
                    <td>${livro.genero}</td>
                    <td>${livro.preco}</td>
                    <td>${livro.formato}</td>
                    <td>${livro.isbn}</td>
                    <td><button class='btn btn-success' onclick="editarLivro('${key}')">Editar</button>
                    <!-- Adicione este botão no seu formulário de edição -->
                    <button class='btn btn-danger' onclick="excluirLivro('${key}')">Excluir</button>
</td>
                    
                `;

                tbody.appendChild(newRow);
            });
        } else {
            console.log('Nenhum livro encontrado no banco de dados.');
        }
    } catch (error) {
        console.error('Erro ao obter dados do banco de dados:', error);
    }
});

function excluirLivro(key) {
    if (confirm("Tem certeza que deseja excluir este livro?")) {
        firebase.database().ref(`livros/${key}`).remove()
            .then(() => {
                alert('Livro excluído com sucesso!');
                window.location.href = 'list-dados.html'; 
            })
            .catch((error) => {
                console.error('Erro ao excluir o livro:', error);
                alert('Erro ao excluir o livro. Tente novamente.');
            });
    }
}
