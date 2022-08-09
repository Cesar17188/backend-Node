const express = require('express');
const app = express();
const server = require('http').Server(app);


const bodyParser = require('body-parser');
const socket = require('./socket');
const db = require('./db');
const router = require('./network/routes');

const url_db = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.DB_NAME}?retryWrites=true&w=majority`;
db(url_db);


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

socket.connect(server);

router(app);

app.use('/app', express.static('public'));


server.listen(3000, function(){
    console.log('La aplicación esta escuchando en http://localhost:3000');
});
