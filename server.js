const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(router);


router.get('/message', (req, res) => {
    console.log(req.headers);
    res.header({
        "custom-header": "Nuestro valor personalizado",
    });
    res.send('Lista de mensajes');
});

router.post('/message', (req, res) => {
    console.log(req.query);
    console.log(req.body);
    res.status(201).send([{error: '', body: 'Creado correctamente'}]);
});


app.listen(3000);
console.log('La aplicación esta escuchando en http://localhost:3000');