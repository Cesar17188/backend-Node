const db = require('mongoose');
const { findById, findOne } = require('./model');
const Model = require('./model');
require('dotenv').config();

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

async function getMessages(filterUser) {
    let filter = {};
    if(filterUser !== null) {
        filter = {user: filterUser};
    }
    return await Model.find(filter);
}

async function updateText(id, message) {
    const foundMessage = await Model.findOne({_id: id});
    foundMessage.message = message;
    return await foundMessage.save();
}

module.exports = {
    add: addMessage,
    list: getMessages,
    updateText: updateText,
    //get
    // delete
} 