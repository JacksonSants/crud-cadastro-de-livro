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

function homeBook() {
    let home = document.getElementById('home-book');
    let register = document.getElementById('register-book');
    let footer = document.getElementById('footer');

    home.classList.remove('hidden');
    register.classList.add('hidden');
    footer.classList.remove('hidden');
}

function registerBook() {
    let home = document.getElementById('home-book');
    let register = document.getElementById('register-book');
    home.classList.add('hidden');
    register.classList.remove('hidden');
    footer.classList.add('hidden');
}
