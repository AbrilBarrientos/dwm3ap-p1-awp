const seccionFavoritos = document.getElementById('favoritos');
let listaFavoritos = JSON.parse(localStorage.getItem('favoritos')) || [];

function mostrarFavoritos() {
    seccionFavoritos.innerHTML = '';

    if (listaFavoritos.length === 0) {
        seccionFavoritos.innerHTML = '<p><i class="fa-regular fa-circle-xmark"></i>No hay películas en favoritos aún.</p>';
        return;
    }

    listaFavoritos.forEach((pelicula, indice) => {
        const tarjeta = document.createElement('div');
        tarjeta.className = 'card';
        tarjeta.innerHTML = `
        <h3>${pelicula.title}</h3>
        <img src="https://image.tmdb.org/t/p/w200${pelicula.poster_path}" alt="${pelicula.title}" />
        <button onclick='eliminarFavorito(${indice})'><i class="fa-solid fa-trash"></i> Eliminar</button>
        `;
        seccionFavoritos.appendChild(tarjeta);
    });
}

function eliminarFavorito(indice) {
    listaFavoritos.splice(indice, 1); //splice elimina el elemento a partir del indice 1
    localStorage.setItem('favoritos', JSON.stringify(listaFavoritos));
    mostrarFavoritos();
}

mostrarFavoritos();
