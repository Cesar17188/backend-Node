const express = require('express');
const router = express.Router();

const app = express();

app.use(router);

router.get('/message', (_req, res) => {
    res.send('Lista de mensajes');
});

router.post('/message', (_req, res) => {
    res.send('Mensaje añadido');
});

// app.use('/', (_req, res)=>{
//     res.send('Hola bienvenido!!');
// });

app.listen(3000);
console.log('La aplicación esta escuchando en http://localhost:3000');