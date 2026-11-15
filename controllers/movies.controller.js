// Renderiza la vista de inicio con el formulario de búsqueda (home.pug)
const getHome = (req, res) => {
    res.status(200).render('home');
};

// Realiza el fetch a la API de OMDB por título y renderiza la ficha (film.pug)
const getFilmByTitle = async (req, res) => {
    try {
        const title = req.params.title;
        const apiKey = process.env.OMDB_API_KEY;
        const url = `http://www.omdbapi.com/?t=${encodeURIComponent(title)}&apikey=${apiKey}`;

        const response = await fetch(url);
        const movie = await response.json();

        // Si la API devuelve que no se encontró la película
        if (movie.Response === "False") {
            return res.status(404).render('film', { error: "Película no encontrada" });
        }

        // Renderiza la vista film.pug pasando los datos de la película
        res.status(200).render('film', { movie });
    } catch (error) {
        console.log(`ERROR: ${error.stack}`);
        res.status(500).render('film', { error: "Error al conectar con el servicio de películas" });
    }
};

// Recibe el formulario POST del buscador y redirige a la ruta GET de la película
const postFilmSearch = (req, res) => {
    const title = req.body.title; // El campo 'name' del input en el formulario
    if (!title) {
        return res.redirect('/');
    }
    res.redirect(`/film/${encodeURIComponent(title)}`);
};

module.exports = {
    getHome,
    getFilmByTitle,
    postFilmSearch
};