document.getElementById("form-register").addEventListener("submit", function (e) {
    e.preventDefault();
    let user = document.getElementById("nameRegister").value;
    let email = document.getElementById("emailRegister").value;
    let senha = document.getElementById("passwordRegister").value;
    let senha_confirm = document.getElementById("confirmPasswordRegister").value;

    // Verifique se a senha tem pelo menos 6 caracteres
    if (senha.length < 6) {
        alert("A senha deve ter pelo menos 6 caracteres.");
        return; // Impede o restante do código de ser executado
    }

    if (!/^[a-zA-Z ]+$/.test(user) || !user.includes(" ")) {
        alert("O nome é inválido, retire os caracteres especiais.");
        return; // Impede o restante do código de ser executado
    }else {
        if (senha === senha_confirm) {
            auth.createUserWithEmailAndPassword(email, senha)
            .then((userCredential) => {
                // Adiciona os dados do usuário ao banco de dados
                db.collection("user")
                    .doc(userCredential.user.uid)
                    .set({
                        email: email,
                        senha: senha,
                        user: user
                    })
                    .then(() => {
                        console.log("Usuário cadastrado com sucesso.");
                        alert("Usuário cadastrado com sucesso.");
                        document.getElementById("form-register").reset();
                        entrarConta();
                        
                        // Você pode redirecionar o usuário para a página de login ou fazer qualquer outra coisa necessária após o cadastro
                    })
                    .catch((error) => {
                        console.error("Erro ao adicionar dados do usuário ao banco de dados:", error);
                        alert("Erro ao cadastrar usuário");
                    });
            })
            .catch((error) => {
                // Se o erro for de e-mail já em uso, trate-o aqui
                if (error.code === "auth/email-already-in-use") {
                    alert("O endereço de e-mail já está em uso por outra conta. Por favor, use outro endereço de e-mail.");
                } else {
                    console.error("Erro ao cadastrar usuário:", error);
                    alert("Erro ao cadastrar usuário");
                }
            });
        }
        else {
            alert ('As senhas não são idênticas. Tennte novamente');
        }
    }

    
});


document.getElementById('loginRegister').addEventListener('submit', function(event) {
    event.preventDefault();

    // Obter o email e a senha fornecidos pelo usuário
    let email = document.getElementById('emailLogin').value;
    let password = document.getElementById('passwordLogin').value;

    // Verifique se a senha foi fornecida
    if (password === '') {
        alert("Por favor, insira sua senha.");
        return;
    }

    // Autenticar o usuário usando o Firebase Authentication
    auth.signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log('Usuário autenticado:', user);
            window.location.href = `index.html`
            alert('Bem-vindo: ' + user.email);
        })
        .catch((error) => {
            console.error('Erro ao autenticar o usuário:', error);
            alert('Email ou senha incorretos. Por favor, tente novamente.'); // Exibir mensagem de erro para o usuário
        });
});

function contentPerfil() {
    const cardPerfil = document.getElementById('userPerfil');
    const user = auth.currentUser;

    if (user) {
        // Recuperar o documento do usuário no Firestore
        const userDocRef = db.collection('user').doc(user.uid);

        userDocRef.get().then((doc) => {
            if (doc.exists) {
                const userData = doc.data();
                const cardUser = `
                <div class="container d-flex flex-column justify-content-center">
                    <div class="profile d-flex justify-content-center mb-3 mt-4">
                        <img src="${userData.photouser}" alt="Perfil do usuário">
                    </div>
                    <div class="user-daods-phot0">
                        <input type="file" class="form-control user-photo" id="user-photo" required placeholder="Adicionar foto">
                        <p>Adicione sua foto de perfil</p>
                    </div>


                    <h2 class="text-center">${userData.user}</h2>
                    <h3 class="text-center">${user.email}</h3>
                </div>`;
                cardPerfil.innerHTML = cardUser;
            } else {
                // Se não houver documento para o usuário, exibir apenas o e-mail
                const cardUser = `
                <div class="container d-flex flex-column justify-content-center">
                    <div class="profile d-flex justify-content-center">
                        <img src="livro/perfil.jpg" alt="user profile">
                    </div>

                    

                    <h2 class="text-center">${user.displayName}</h2>
                    <h3 class="text-center">${user.email}</h3>
                </div>`;
                cardPerfil.innerHTML = cardUser;
            }
        }).catch((error) => {
            console.error("Erro ao recuperar dados do usuário:", error);
        });
    } else {
        console.log("Erro ao mostrar informações do usuário");
    }
}

function verificarAutenticacao() {
    // Adicionar um observador de autenticação do Firebase
    auth.onAuthStateChanged(function(user) {
        if (!user) {
            window.location.href = 'registration.html';
        }
    });
}