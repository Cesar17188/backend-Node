const db = require('mongoose');
require('dotenv').config();

db.Promise = global.Promise;

async function connect(url) {

    await db.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("[db] Conectada con éxito");
}


module.exports = connect;