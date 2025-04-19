const CLAVE_API = '0926f4c23dbf7d3a4f8aef7a7ec28aab'; //La clave de la API de TMDB
const URL_BASE = 'https://api.themoviedb.org/3'; //URL base de la API para hacer las peticiones.

const contenedorPeliculas = document.getElementById('peliculas');
const modal = document.getElementById('modal');
const buscador = document.getElementById('buscador');

async function obtenerPeliculas(url) {
    try {
        const respuesta = await fetch(url);
        if (!respuesta){
            console.log('Error al conectar con la API');
        }else{
            console.log('Conectado a la API correctamente')
        }
        const datos = await respuesta.json();
        mostrarPeliculas(datos.results);
    } catch (error) {
        contenedorPeliculas.innerHTML = `<p class="error">No se pudo cargar la información. Intenta nuevamente.</p>`;
        console.error('Error:', error);
    }
}

function mostrarPeliculas(lista) {
    contenedorPeliculas.innerHTML = '';
    lista.forEach(pelicula => {
        const tarjeta = document.createElement('div');
        tarjeta.className = 'card';
        
        // Creamos el contenedor del pie de la tarjeta (card-footer)
        const cardFooter = document.createElement('div');
        cardFooter.className = 'card-footer';
        
        // Estructura HTML de la tarjeta
        tarjeta.innerHTML = `
            <h3>${pelicula.title}</h3>
            <img src="https://image.tmdb.org/t/p/w200${pelicula.poster_path}" alt="${pelicula.title}" />
        `;
        
        // Agregamos los botones dentro del pie de la tarjeta
        cardFooter.innerHTML = `
            <button onclick='verDetalle(${JSON.stringify(pelicula)})'><i class="fa-solid fa-circle-info"></i>Ver detalles</button>
            <button onclick='agregarAFavoritos(${JSON.stringify(pelicula)})'><i class="fa-solid fa-star"></i>Agregar a favoritos</button>
        `;
        
        // Añadimos el pie de la tarjeta a la tarjeta
        tarjeta.appendChild(cardFooter);
        
        // Añadimos la tarjeta al contenedor
        contenedorPeliculas.appendChild(tarjeta);
    });
}


function verDetalle(pelicula) {
    // Definimos el contenido del modal
    modal.innerHTML = `
        <div class="modal-content">
            <h2>${pelicula.title}</h2>
            <p>${pelicula.overview}</p>
            <img src="https://image.tmdb.org/t/p/w500${pelicula.poster_path}" alt="${pelicula.title}" />
            <button onclick='cerrarModal()'>X</button>
        </div>
    `;
    // Mostramos el modal
    modal.classList.add('mostrar');
}

// Función para cerrar el modal
function cerrarModal() {
    modal.classList.remove('mostrar');
}

function agregarAFavoritos(pelicula) {
    let favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];

    // Encuentra si la película ya está en favoritos
    let yaExiste = favoritos.find(item => item.id === pelicula.id);

    // Si no está, lse agrega
    if (!yaExiste) {
        favoritos.push(pelicula); // Agrega la nueva película
        localStorage.setItem('favoritos', JSON.stringify(favoritos)); // Guarda en local storage
        alert('Película agregada a favoritos');
    } else {
      // Si ya estaba, mostramos un mensaje
        alert('La película ya está en favoritos');
    }
}


buscador.addEventListener('change', () => {
    const buscar = buscador.value.trim();
    if (buscar.length > 0) {
        obtenerPeliculas(`${URL_BASE}/search/movie?api_key=${CLAVE_API}&query=${buscar}`);
    }
});

// Películas populares = 'movie/popular'
obtenerPeliculas(`${URL_BASE}/movie/popular?api_key=${CLAVE_API}`);