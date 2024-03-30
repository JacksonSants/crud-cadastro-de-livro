document.addEventListener(`DOMContentLoaded`, function() {
    contentBook();
    homeBook();
    verificarAutenticacao()
    
});

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
    let list = document.getElementById('list-book');
    let perfil = document.getElementById('perfil');

    home.classList.remove('hidden');
    register.classList.add('hidden');
    footer.classList.add('hidden');
    list.classList.add('hidden');
    perfil.classList.add('hidden');
}

function registerBook() {
    let home = document.getElementById('home-book');
    let register = document.getElementById('register-book');
    let list = document.getElementById('list-book');
    let perfil = document.getElementById('perfil');

    home.classList.add('hidden');
    register.classList.remove('hidden');
    footer.classList.add('hidden');
    list.classList.add('hidden');
    perfil.classList.add('hidden');
}

function listBook() {
    let perfil = document.getElementById('perfil');
    let list = document.getElementById('list-book');
    let home = document.getElementById('home-book');
    let register = document.getElementById('register-book');
    let footer = document.getElementById('footer');
    
    
    list.classList.remove('hidden');
    perfil.classList.add('hidden');
    home.classList.add('hidden');
    register.classList.add('hidden');
    footer.classList.add('hidden');
    listDataLibrary();
}

function perfil() {
    let perfil = document.getElementById('perfil');
    let list = document.getElementById('list-book');
    let home = document.getElementById('home-book');
    let register = document.getElementById('register-book');
    let footer = document.getElementById('footer');

    perfil.classList.remove('hidden');
    list.classList.add('hidden');
    home.classList.add('hidden');
    register.classList.add('hidden');
    footer.classList.add('hidden');
    contentPerfil();
}
