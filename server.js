const express = require('express');
const app = express();
const server = require('http').Server(app);
const config = require('./config');


const cors = require('cors');
const bodyParser = require('body-parser');
const socket = require('./socket');
const db = require('./db');
const router = require('./network/routes');

const url_db = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.DB_NAME}?retryWrites=true&w=majority`;
db(url_db);

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

socket.connect(server);

router(app);

app.use(''+ config.publicRoute, express.static('public'));


server.listen(config.port, function(){
    console.log(`La aplicación esta escuchando en ${config.host}:${config.port}`);
});
