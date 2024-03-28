
//Função de cadastrar livro e foto
document.getElementById('book-form').addEventListener('submit', function (e) {
    e.preventDefault();

    const titulo = document.getElementById('titulo').value;
    const autor = document.getElementById('autor').value;
    const sinopse = document.getElementById('sinopse').value;
    const genero = document.getElementById('genero').value;
    const preco = document.getElementById('preco').value;
    const formato = document.getElementById('formato').value;
    const isbn = document.getElementById('isbn').value;
    const foto = document.getElementById('img-file').files[0]; // Get the selected image file

    try {
        // Reference to the 'livro' collection
        const livroRef = db.collection('livro');
        // Collection of data
        const livroData = {
            titulo: titulo,
            autor: autor,
            sinopse: sinopse,
            genero: genero,
            preco: preco,
            formato: formato,
            isbn: isbn
        };

        // Add data to Firestore
        livroRef.add(livroData)
            .then((docRef) => {
                console.log("Livro adicionado com sucesso: ", docRef.id);
                const livroId = docRef.id;
                // Call function to handle photo upload and linking to the livro
                return uploadAndLinkPhotoToLivro(livroId, foto);
                
            })
            .then(() => {
                alert("Livro e foto cadastrados com sucesso!");
                document.getElementById('book-form').reset();
            })
            .catch((error) => {
                console.error("Erro ao adicionar livro: ", error);
                alert("Erro ao adicionar livro");
            });
    } catch (error) {
        console.error("Erro ao adicionar livro: ", error);
        alert("Erro ao adicionar livro");
    }
});

function uploadAndLinkPhotoToLivro(livroId, foto) {
    return new Promise((resolve, reject) => {
        if (!foto) {
            alert('Por favor, adicione a foto do livro.');
            reject('Foto não encontrada');
            return;
        }

        const fotoRef = storageRef.child(`livros/${livroId}_${foto.name}`); // Add livroId to the photo name

        fotoRef.put(foto)
            .then((snapshot) => {
                return snapshot.ref.getDownloadURL();
            })
            .then((imageUrl) => {
                // Update livro document with photo URL
                return db.collection('livro').doc(livroId).update({ fotoUrl: imageUrl });
            })
            .then(() => {
                console.log('Foto adicionada ao livro com ID:', livroId);
                alert("Foto cadastrada com sucesso.");
                resolve();
            })
            .catch((error) => {
                console.error('Erro ao enviar a foto:', error);
                alert('Erro ao enviar a foto. Tente novamente.');
                reject(error);
            });
    });
}

//Função de listar
document.addEventListener(`DOMContentLoaded`, function () {
    
    // Selecionar o elemento onde os cards serão exibidos
    const cardLibrary = document.getElementById("card-library");
    const livrosRef = db.collection('livro'); // Corrigindo para 'livrosRef'

    // Limpar o conteúdo atual para evitar duplicatas
    cardLibrary.innerHTML = '';

    // Obter os dados dos livros do Firestore
    livrosRef.get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            const livro = doc.data(); // Dados do livro

            // Construir o HTML para cada livro
            const cardHTML = `
                <div class="card" style="width: 18rem;">
                    <img src="${livro.fotoUrl}" class="card-img-top mx-auto mt-3" alt="...">
                    <div class="card-body">
                        <h5 class="card-title" style="text-align: center;">${livro.titulo}</h5>

                        <div class="buy">
                            <a href="#" class="btn btn-primary">Comprar</a>
                            <img src="img/heart-fill.svg" alt="">
                        </div>
                    </div>
                </div>
            `;

            // Adicionar o HTML do card ao elemento pai
            cardLibrary.innerHTML += cardHTML;
        });
    }).catch((error) => {
        console.error("Erro ao obter os livros:", error);
    });
});

// Função para excluir um livro e sua foto associada
function excluirLivro(livroId, fotoUrl) {
    // Excluir o documento do livro do Firestore
    db.collection('livro').doc(livroId).delete()
        .then(() => {
            console.log(`Livro com ID ${livroId} excluído com sucesso.`);
            // Excluir a foto do armazenamento do Firebase
            const fotoRef = storage.refFromURL(fotoUrl);
            fotoRef.delete()
                .then(() => {
                    console.log(`Foto do livro com ID ${livroId} excluída com sucesso.`);
                    alert("Livro e foto excluídos com sucesso.");
                    // Atualizar a interface do usuário, se necessário
                })
                .catch((error) => {
                    console.error(`Erro ao excluir a foto do livro com ID ${livroId}:`, error);
                    alert("Erro ao excluir a foto do livro. Tente novamente.");
                });
        })
        .catch((error) => {
            console.error(`Erro ao excluir o livro com ID ${livroId}:`, error);
            alert("Erro ao excluir o livro. Tente novamente.");
        });
}

document.addEventListener('DOMContentLoaded', function () {
    const cardLibrary = document.getElementById("card-library");

    cardLibrary.addEventListener('click', function (event) {
        // Verificar se o botão de exclusão foi clicado
        if (event.target.classList.contains('btn-excluir-livro')) {
            // Obter o ID do livro associado ao botão de exclusão
            const livroId = event.target.dataset.livroId;
            // Obter a URL da foto associada ao livro
            const fotoUrl = event.target.dataset.fotoUrl;
            // Confirmar a exclusão com o usuário antes de continuar
            if (confirm("Tem certeza de que deseja excluir este livro?")) {
                // Chamar a função para excluir o livro e sua foto
                excluirLivro(livroId, fotoUrl);
            }
        }
    });
});


//Funcao para listar inforções do banco
//Função de listar
document.addEventListener(`DOMContentLoaded`, function () {
    
    // Selecionar o elemento onde os cards serão exibidos
    const cardLibrary = document.getElementById("card-library");
    const livrosRef = db.collection('livro'); // Corrigindo para 'livrosRef'

    // Limpar o conteúdo atual para evitar duplicatas
    cardLibrary.innerHTML = '';

    // Obter os dados dos livros do Firestore
    livrosRef.get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            const livro = doc.data(); // Dados do livro

            // Construir o HTML para cada livro
            const cardHTML = `
                <div class="card" style="width: 18rem;">
                    <img src="${livro.fotoUrl}" class="card-img-top mx-auto mt-3" alt="...">
                    <div class="card-body">
                        <h5 class="card-title" style="text-align: center;">${livro.titulo}</h5>

                        <div class="buy">
                            <a href="#" class="btn btn-primary">Comprar</a>
                            <img src="img/heart-fill.svg" alt="">
                        </div>
                    </div>
                </div>
            `;

            // Adicionar o HTML do card ao elemento pai
            cardLibrary.innerHTML += cardHTML;
        });
    }).catch((error) => {
        console.error("Erro ao obter os livros:", error);
    });
});

function listDataLibrary() {
    // Selecionar o elemento onde os dados serão exibidos
    const dataLibrary = document.getElementById("listLibrary");
    const livrosRef = db.collection('livro'); // Corrigindo para 'livrosRef'

    // Limpar o conteúdo atual para evitar duplicatas
    dataLibrary.innerHTML = '';

    // Obter os dados dos livros do Firestore
    livrosRef.get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            const livro = doc.data(); // Dados do livro

            // Construir o HTML para cada livro
            const dataHTML = `
                <tr>
                    <td><img style='width: 100px;' src="${livro.fotoUrl}" alt="Foto do livro"></td>
                    <td>${livro.titulo}</td>
                    <td>${livro.autor}</td>
                    <td>${livro.genero}</td> <!-- Corrigindo para 'genero' -->
                    <td>${livro.preco}</td> <!-- Corrigindo para 'preco' -->
                    <td>${livro.isbn}</td>
                    <td>
                        <button class='btn btn-primary'>Editar</button>
                        <button class='btn btn-danger'>Excluir</button>
                    </td>
                </tr>
            `;

            // Adicionar o HTML da linha ao elemento pai
            dataLibrary.innerHTML += dataHTML;
        });
    }).catch((error) => {
        console.error("Erro ao obter os livros:", error);
    });
}
