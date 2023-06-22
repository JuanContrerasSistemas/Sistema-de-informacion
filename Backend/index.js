const express = require('express');
const path = require('path');
let imagen = { name: 'nombre', ubicacion: 'ubicacion' };
let header = [{ name: 'logo', ubicacion: 'imagenes/logo.jpeg' }, { name: 'facebook', ubicacion: 'imagenes/facebook.png' }, { name: 'whatsapp', ubicacion: 'imagenes/whatsapp.png' }];
let productos=[];
let promociones=[];
let paginas=[];
//funciones

//inicia
const app = express();
//funciones con app
function establecerimg(raiz,imagen) {
    app.get (raiz + imagen.name, (req, res) => {
        const ubicacion = path.join(__dirname, imagen.ubicacion);
        res.sendFile(ubicacion);
        console.log(imagen.name);
    });
}
//configura
app.set('port', 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//rutas
app.get('/monipan', (req, res) => {
    res.redirect('/monipan/inicio');
});
app.get('/monipan/inicio', (req, res) => {
    res.render('index');
    console.log('cargado');
});
app.get('/monipan/productos/pagina/1', (req, res) => {
    res.end([]);
    console.log('pagina');
});
for (let i = 0; i < header.length; i++) {
    imagen = header[i];
    let raiz = '/monipan/imagenes/';
    establecerimg(raiz,imagen);
}
//empezar
app.listen(app.get('port'), () => {
    console.log('en espera');
});
//para iniciar usar: npm run dev