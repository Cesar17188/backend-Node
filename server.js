const express = require('express');
const bodyParser = require('body-parser');

const response = require('./network/response');

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
    response.success(req, res, 'Lista de mensajes');
});

router.post('/message', (req, res) => {
    console.log(req.query);
    if(req.query.error == "ok") {
        response.error(req, res, 'Error simulado', 400);
    } else {
        response.success(req, res, 'Creado corretamente', 201);
    }
});


app.listen(3000);
console.log('La aplicación esta escuchando en http://localhost:3000');