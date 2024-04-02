document.addEventListener(`DOMContentLoaded`, function() {
    verificarAutenticacao();
    newBook();
    destackBook();
});

//Função de listar
function newBook() {
    // Selecionar o elemento onde os cards serão exibidos
    const cardLibrary = document.getElementById("new-book");
    const livrosRef = db.collection("livro"); // Corrigindo para 'livrosRef'
  
    // Limpar o conteúdo atual para evitar duplicatas
    cardLibrary.innerHTML = "";
  
    // Obter os dados dos livros do Firestore
    livrosRef
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const livro = doc.data(); // Dados do livro
  
          // Construir o HTML para cada livro
          const cardHTML = `
              <div class="card m-0 p-0" style="width: 14rem;">
                  <img src="${livro.fotoUrl}" class="card-img-top mx-auto mt-2" alt="...">
                  <div class="card-body p-2">
                      <h5 class="card-title mb-0">${livro.titulo}</h5>
                      <h5 class="card-title mb-0">Autor: ${livro.autor}</h5>
                  </div>
              </div>
          
              `;
  
          // Adicionar o HTML do card ao elemento pai
          cardLibrary.innerHTML += cardHTML;
        });
      })
      .catch((error) => {
        console.error("Erro ao obter os livros:", error);
      });
  }

  //Função de listar
function destackBook() {
    // Selecionar o elemento onde os cards serão exibidos
    const cardLibrary = document.getElementById("destack");
    const livrosRef = db.collection("livro"); // Corrigindo para 'livrosRef'
  
    // Limpar o conteúdo atual para evitar duplicatas
    cardLibrary.innerHTML = "";
  
    // Obter os dados dos livros do Firestore
    livrosRef
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const livro = doc.data(); // Dados do livro
  
          // Construir o HTML para cada livro
          const cardHTML = `
              <div class="card m-0 p-0" style="width: 14rem;">
                  <img src="${livro.fotoUrl}" class="card-img-top mx-auto mt-2" alt="...">
                  <div class="card-body p-2">
                      <h5 class="card-title mb-0">${livro.titulo}</h5>
                      <h5 class="card-title mb-0">Autor: ${livro.autor}</h5>
                  </div>
              </div>
          
              `;
  
          // Adicionar o HTML do card ao elemento pai
          cardLibrary.innerHTML += cardHTML;
        });
      })
      .catch((error) => {
        console.error("Erro ao obter os livros:", error);
      });
  }