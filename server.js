const express = require('express');

const app = express();

app.use('/', (_req, res)=>{
    res.send('Hola');
});

app.listen(3000);
console.log('La aplicación esta escuchando en http://localhost:3000');