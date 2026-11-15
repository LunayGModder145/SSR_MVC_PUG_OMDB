require('dotenv').config();
const express = require('express')
const app = express()
const port = process.env.PORT || 3000;

// Configuración de motor de plantillas con PUG
app.set('view engine', 'pug');
app.set('views','./views');

// Rutas
const productsRoutes = require("./routes/products.routes");
const productsWebRoutes = require("./routes/products.web.routes");
const moviesRoutes = require("./routes/movies.routes");

app.use(express.json()); // Habilito recepción de JSON en servidor
app.use(express.urlencoded({ extended: true })); // Clave para leer datos del formulario POST
app.use(express.static('public')); // Para servir archivos estáticos del front CSS, JS, assets


/* app.get('/', (req, res) => {
  res.send('Hello World!')
}) */

  
// Rutas
//API
app.use('/api/products',productsRoutes);
// WEB
app.use('/products',productsWebRoutes);
app.use('/', moviesRoutes);

// Rutas web ejemplo
app.get('/first_template', function(req, res){
  res.render('first_view');
});

// Habilitar ruta about
app.get('/about', function(req, res){
  res.render('about');
});

app.get('/dynamic_view', function(req, res){
  res.render('dynamic', {
     name: "The Bridge of San Luis Rey", 
     url:"https://thebridge.tech/"
  });
});


app.listen(port, () => {
  console.log(`Nos vamos a por tortilla. Funcionando en: http://localhost:${port}`)
})