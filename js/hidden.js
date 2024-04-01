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
    let banner = document.getElementById('banner');
    let servico = document.getElementById('servico');
    let rodape = document.getElementById('rodape');

    home.classList.remove('hidden');
    register.classList.add('hidden');
    footer.classList.remove('hidden');
    list.classList.add('hidden');
    perfil.classList.add('hidden');
    servico.classList.remove('hidden');
    banner.classList.remove('hidden');
    rodape.classList.remove('hidden');
}

function registerBook() {
    let home = document.getElementById('home-book');
    let register = document.getElementById('register-book');
    let list = document.getElementById('list-book');
    let perfil = document.getElementById('perfil');
    let banner = document.getElementById('banner');
    let servico = document.getElementById('servico');

    home.classList.add('hidden');
    register.classList.remove('hidden');
    footer.classList.add('hidden');
    list.classList.add('hidden');
    perfil.classList.add('hidden');
    servico.classList.add('hidden');
    banner.classList.add('hidden');
}

function listBook() {
    let perfil = document.getElementById('perfil');
    let list = document.getElementById('list-book');
    let home = document.getElementById('home-book');
    let register = document.getElementById('register-book');
    let footer = document.getElementById('footer');
    let banner = document.getElementById('banner');
    let servico = document.getElementById('servico');
    
    
    list.classList.remove('hidden');
    perfil.classList.add('hidden');
    home.classList.add('hidden');
    register.classList.add('hidden');
    footer.classList.add('hidden');
    servico.classList.add('hidden');
    banner.classList.add('hidden');
    listDataLibrary();
}

function perfil() {
    let perfil = document.getElementById('perfil');
    let list = document.getElementById('list-book');
    let home = document.getElementById('home-book');
    let register = document.getElementById('register-book');
    let footer = document.getElementById('footer');
    let banner = document.getElementById('banner');
    let rodape = document.getElementById('rodape');
    let servico = document.getElementById('servico');

    perfil.classList.remove('hidden');
    list.classList.add('hidden');
    home.classList.add('hidden');
    register.classList.add('hidden');
    footer.classList.add('hidden');
    rodape.classList.add('hidden');
    banner.classList.add('hidden');
    servico.classList.add('hidden');
    contentPerfil();
}
