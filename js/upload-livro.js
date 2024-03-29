
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

//Cadastrar foto
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
/*Fim do cadastro */

//Função de listar
function contentBook() {
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
}


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
                    <td class="d-flex align-items">
                        <button class='btn btn-primary'>Editar</button>
                        <button class='btn btn-danger btn-excluir-livro' data-livro-id="${doc.id}" data-foto-url="${livro.fotoUrl}">Excluir</button>
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

//Listar todos os dados do banco
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
                        <button class='btn btn-primary' onclick='editDataLibrary()'>Editar</button>
                        <button class='btn btn-danger btn-excluir-livro' data-livro-id="${doc.id}" data-foto-url="${livro.fotoUrl}">Excluir</button>
                    </td>
                </tr>
            `;

            // Adicionar o HTML da linha ao elemento pai
            dataLibrary.innerHTML += dataHTML;
        });

        // Adicionar event listener para botões de exclusão
        const btnsExcluir = document.querySelectorAll('.btn-excluir-livro');
        btnsExcluir.forEach(btn => {
            btn.addEventListener('click', function() {
                const livroId = this.getAttribute('data-livro-id');
                const fotoUrl = this.getAttribute('data-foto-url');
                if (confirm("Tem certeza de que deseja excluir este livro?")) {
                    excluirLivro(livroId, fotoUrl);
                }
            });
        });
    }).catch((error) => {
        console.error("Erro ao obter os livros:", error);
    });
}

function excluirLivro(livroId, fotoUrl) {
    // Excluir o documento do livro do Firestore
    db.collection('livro').doc(livroId).delete()
        .then(() => {
            console.log(`Livro com ID ${livroId} excluído com sucesso.`);
            // Excluir a foto do armazenamento do Firebase
            const storageRef = firebase.storage().refFromURL(fotoUrl); // Corrigindo para usar firebase.storage()
            storageRef.delete()
                .then(() => {
                    console.log(`Foto do livro com ID ${livroId} excluída com sucesso.`);
                    alert("Livro e foto excluídos com sucesso.");
                    window.location.reload();
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
//Listar todos os dados do banco
function editDataLibrary() {
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
            <form id="update-book-form-${doc.id}" data-livro-id="${doc.id}">

                <div class="form-group">
                    <label for="titulo-${doc.id}">Título:</label>
                    <input type="text" class="form-control" id="titulo-${doc.id}" value='${livro.titulo}' placeholder="Título do Livro">
                </div>

                <div class="form-group">
                    <label for="autor-${doc.id}">Autor(es):</label>
                    <input type="text" class="form-control" id="autor-${doc.id}" value='${livro.autor}' placeholder="Autor(es) do Livro" required>
                </div>

                <div class="form-group">
                    <img style='width: 80px;' src="${livro.fotoUrl}">
                    <label for="img-file-${doc.id}">Foto atual, selecione a nova:</label>
                    <input type="file" class="form-control" id="img-file-${doc.id}" required>
                </div>

                <div class="form-group">
                    <label for="sinopse-${doc.id}">Sinopse:</label>
                    <textarea class="form-control" id="sinopse-${doc.id}" rows="3" placeholder="Sinopse do Livro" required>${livro.sinopse}</textarea>
                </div>

                <div class="form-group">
                    <label for="genero-${doc.id}">Gênero:</label>
                    <input type="text" class="form-control" id="genero-${doc.id}" value='${livro.genero}'placeholder="Gênero do Livro" required>
                </div>

                <div class="form-group">
                    <label for="preco-${doc.id}">Preço:</label>
                    <input type="text" class="form-control" id="preco-${doc.id}" placeholder="Preço do Livro" value='${livro.preco}' required>
                </div>

                <div class="form-group">
                    <label for="formato-${doc.id}">Formato:</label>
                    <select class="form-control" id="formato-${doc.id}" required>
                        <option>Impresso</option>
                        <option>Ebook</option>
                    </select>
                </div>

                <div class="form-group">
                    <label for="isbn-${doc.id}">ISBN:</label>
                    <input type="number" class="form-control" id="isbn-${doc.id}" placeholder="ISBN do Livro" value='${livro.isbn}' required>
                </div>

                <button type="button" class="btn btn-primary" onclick='updateData("${doc.id}")'>Atualizar</button>

            </form>
            `;

            // Adicionar o HTML da linha ao elemento pai
            dataLibrary.innerHTML += dataHTML;
        });

    }).catch((error) => {
        console.error("Erro ao obter os livros:", error);
    });
}

function updateData(livroId) { // Recebe o livroId como parâmetro
    // Obtenha os novos valores dos campos do formulário
    const titulo = document.getElementById(`titulo-${livroId}`).value;
    const autor = document.getElementById(`autor-${livroId}`).value;
    const sinopse = document.getElementById(`sinopse-${livroId}`).value;
    const genero = document.getElementById(`genero-${livroId}`).value;
    const preco = document.getElementById(`preco-${livroId}`).value;
    const formato = document.getElementById(`formato-${livroId}`).value;
    const isbn = document.getElementById(`isbn-${livroId}`).value;
    const foto = document.getElementById(`img-file-${livroId}`).files[0]; // Obtenha o novo arquivo de imagem selecionado, se houver

    try {
        // Atualize os dados do livro no Firestore
        db.collection('livro').doc(livroId).update({
            titulo: titulo,
            autor: autor,
            sinopse: sinopse,
            genero: genero,
            preco: preco,
            formato: formato,
            isbn: isbn
        })
        .then(() => {
            console.log("Livro atualizado com sucesso.");
            // Se uma nova foto foi selecionada, chame a função para fazer upload da nova foto
            if (foto) {
                uploadAndLinkPhotoToLivro(livroId, foto);
            } else {
                alert("Livro atualizado com sucesso.");
            }
        })
        .catch((error) => {
            console.error("Erro ao atualizar livro:", error);
            alert("Erro ao atualizar livro. Tente novamente.");
        });
    } catch (error) {
        console.error("Erro ao atualizar livro:", error);
        alert("Erro ao atualizar livro. Tente novamente.");
    }
}

// Função para fazer upload da nova foto e atualizar a URL da foto no Firestore
function updatePhoto(livroId, foto) {
    return new Promise((resolve, reject) => {
        if (!foto) {
            reject('Nenhuma foto selecionada');
            return;
        }

        const fotoRef = storageRef.child(`livros/${livroId}_${foto.name}`); // Adiciona o ID do livro ao nome da foto

        fotoRef.put(foto)
            .then((snapshot) => {
                return snapshot.ref.getDownloadURL();
            })
            .then((imageUrl) => {
                // Atualiza o documento do livro com a URL da nova foto
                return db.collection('livro').doc(livroId).update({ fotoUrl: imageUrl });
            })
            .then(() => {
                console.log('Foto atualizada com sucesso.');
                resolve();
            })
            .catch((error) => {
                console.error('Erro ao fazer upload da foto:', error);
                reject(error);
            });
    });
}
