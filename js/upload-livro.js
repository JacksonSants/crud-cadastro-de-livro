document.getElementById('book-form').addEventListener('submit', function (e) {
    e.preventDefault();

    const titulo = document.getElementById('titulo').value;
    const autor = document.getElementById('autor').value;
    const sinopse = document.getElementById('sinopse').value;
    const genero = document.getElementById('genero').value;
    const preco = document.getElementById('preco').value;
    const formato = document.getElementById('formato').value;
    const isbn = document.getElementById('isbn').value;

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
                // Assuming you have a livrosCollection reference set
                const livroId = docRef.id;
                return cadastrarFoto(livroId); // Call function to handle photo upload and linking to the livro
            })
            .then(() => {
                alert("Livro e foto cadastrados com sucesso!");
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

function cadastrarFoto(livroId) {
    return new Promise(function(resolve, reject) {
        const foto = document.getElementById('img-file').files[0];

        if (!foto) {
            alert('Por favor, adicione a foto do livro.');
            reject('Foto não encontrada');
            return;
        }

        const fotoRef = storageRef.child(`livros/${livroId}_${foto.name}`); // Add livroId to the photo name

        fotoRef.put(foto)
            .then(function(snapshot) {
                return snapshot.ref.getDownloadURL();
            })
            .then(function(imageUrl) {
                return adicionarFotoAoLivro(livroId, imageUrl);
            })
            .then(function() {
                alert("Foto cadastrada com sucesso.");
                resolve();
                homeBook();
                carregarDadosNoCard();
            })
            .catch(function(error) {
                console.error('Erro ao enviar a foto:', error);
                alert('Erro ao enviar a foto. Tente novamente.');
                reject(error);
            });
    });
}

function adicionarFotoAoLivro(livroId, imageUrl) {
    return new Promise(function(resolve, reject) {
        // Assuming you have a livrosCollection reference set
        const livroDocRef = db.collection('livro').doc(livroId);

        // Update livro document with photo URL
        livroDocRef.update({
            fotoUrl: imageUrl
        })
            .then(function() {
                console.log('Foto adicionada ao livro com ID:', livroId);
                resolve();
            })
            .catch(function(error) {
                console.error('Erro ao adicionar foto ao livro:', error);
                alert('Erro ao adicionar foto ao livro. Tente novamente.');
                reject(error);
            });
    });
}


const livroRef = firebase.firestore().collection('livro');

  // Função para carregar dados do Firestore e preencher o card
  function carregarDadosNoCard() {
    // Seletor do elemento do card
    const cardElement = document.querySelector('.card');

    // Limpar conteúdo do card
    cardElement.innerHTML = '';

    // Obter dados do Firestore
    livroRef.get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        const livroData = doc.data();

        // Criar elementos do card
        const card = document.createElement('div');
        card.classList.add('card');
        card.style.width = '18rem';

        const img = document.createElement('img');
        img.src = livroData.fotoUrl; // Adapte para o campo correto no seu Firestore
        img.classList.add('card-img-top', 'mx-auto', 'mt-3');
        img.alt = 'Imagem do Livro';

        const cardBody = document.createElement('div');
        cardBody.classList.add('card-body');

        const title = document.createElement('h5');
        title.classList.add('card-title');
        title.style.textAlign = 'center';
        title.textContent = livroData.titulo;

        const author = document.createElement('p');
        author.classList.add('card-text');
        author.textContent = `Autor: ${livroData.autor}`;

        const edition = document.createElement('p');
        edition.classList.add('card-text');
        edition.textContent = `Edição: ${livroData.edicao}`;

        const publisher = document.createElement('p');
        publisher.classList.add('card-text');
        publisher.textContent = `Editora: ${livroData.editora}`;

        const buyDiv = document.createElement('div');
        buyDiv.classList.add('buy');

        const buyLink = document.createElement('a');
        buyLink.href = '#';
        buyLink.classList.add('btn', 'btn-primary');
        buyLink.textContent = 'Comprar';

        const heartImg = document.createElement('img');
        heartImg.src = 'img/heart-fill.svg'; // Coloque o caminho correto para o ícone do coração

        // Anexar elementos ao card
        buyDiv.appendChild(buyLink);
        buyDiv.appendChild(heartImg);

        cardBody.appendChild(title);
        cardBody.appendChild(author);
        cardBody.appendChild(edition);
        cardBody.appendChild(publisher);
        cardBody.appendChild(buyDiv);

        card.appendChild(img);
        card.appendChild(cardBody);

        cardElement.appendChild(card);
      });
    });
  }

  // Chame a função para carregar dados ao carregar a página
 