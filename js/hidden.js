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
    let favorite = document.getElementById('favorite-book');
    let configuracao = document.getElementById('configuracao');
    let profile = document.getElementById('profile');
    let footer = document.getElementById('footer');

    home.classList.remove('hidden');
    register.classList.add('hidden');
    favorite.classList.add('hidden');
    configuracao.classList.add('hidden');
    profile.classList.add('hidden');
    footer.classList.remove('hidden');
}

function registerBook() {
    let home = document.getElementById('home-book');
    let register = document.getElementById('register-book');
    let favorite = document.getElementById('favorite-book');
    let configuracao = document.getElementById('configuracao');
    let profile = document.getElementById('profile');
    let footer = document.getElementById('footer');

    home.classList.add('hidden');
    register.classList.remove('hidden');
    favorite.classList.add('hidden');
    configuracao.classList.add('hidden');
    profile.classList.add('hidden');
    footer.classList.add('hidden');
}

function favoriteBook() {
    let home = document.getElementById('home-book');
    let register = document.getElementById('register-book');
    let favorite = document.getElementById('favorite-book');
    let configuracao = document.getElementById('configuracao');
    let profile = document.getElementById('profile');
    let footer = document.getElementById('footer');

    home.classList.add('hidden');
    register.classList.add('hidden');
    favorite.classList.remove('hidden');
    configuracao.classList.add('hidden');
    profile.classList.add('hidden');
}

function configuracao() {
    let home = document.getElementById('home-book');
    let register = document.getElementById('register-book');
    let favorite = document.getElementById('favorite-book');
    let configuracao = document.getElementById('configuracao');
    let profile = document.getElementById('profile');
    let footer = document.getElementById('footer');

    home.classList.add('hidden');
    register.classList.add('hidden');
    favorite.classList.add('hidden');
    configuracao.classList.remove('hidden');
    profile.classList.add('hidden');
    footer.classList.add('hidden');
}

function profile() {
    let home = document.getElementById('home-book');
    let register = document.getElementById('register-book');
    let favorite = document.getElementById('favorite-book');
    let configuracao = document.getElementById('configuracao');
    let profile = document.getElementById('profile');
    let footer = document.getElementById('footer');

    home.classList.add('hidden');
    register.classList.add('hidden');
    favorite.classList.add('hidden');
    configuracao.classList.add('hidden');
    profile.classList.remove('hidden');
    footer.classList.add('hidden');
    
}