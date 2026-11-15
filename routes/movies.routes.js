const router = require('express').Router();
const moviesController = require('../controllers/movies.controller');

// GET http://localhost:3000/ -> Home con el formulario (home.pug)
router.get('/', moviesController.getHome);

// GET http://localhost:3000/film/:title -> Muestra los detalles de la película (film.pug)
router.get('/film/:title', moviesController.getFilmByTitle);

// POST http://localhost:3000/film -> Recibe la búsqueda del formulario y redirige
router.post('/film', moviesController.postFilmSearch);

module.exports = router;