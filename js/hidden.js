function criarConta() {
    let login = document.getElementById('login');
    let register = document.getElementById('register');

    login.classList.add('hidden');
    register.classList.remove('hidden');
}

function entrarConta() {
    let login = document.getElementById('login');
    let register = document.getElementById('register');

    login.classList.remove('hidden');
    register.classList.add('hidden');
}