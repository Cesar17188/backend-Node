const Model = require('./model');

async function existDB(id) {
    return await Model.exists({
        _id: id
    });
}

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

async function removeMessage(id) {
    if (await existDB(id)){
        return await Model.findOneAndDelete({_id: id})
    }else {
        return false
    }
    
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
    remove: removeMessage,
    //get
    
} 