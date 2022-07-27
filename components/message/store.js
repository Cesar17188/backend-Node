const db = require('mongoose');
const Model = require('./model');
require('dotenv').config();
// mongodb+srv://cesareli17188:hAPtCwUFeMo6jykw@cluster0.gxkowbp.mongodb.net/telegram

db.Promise = global.Promise;

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.DB_NAME}?retryWrites=true&w=majority`;

db.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
console.log('[db] Conectada con éxito')

function addMessage(message) {
    const myMessage = new Model(message);
    myMessage.save();
}

async function getMessages() {
    return await Model.find();
}

module.exports = {
    add: addMessage,
    list: getMessages,
    //get
    //update
    // delete
} 