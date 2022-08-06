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
    return new Promise((resolve, reject) => {
        let filter = {};
        if(filterUser !== null) {
            filter = {user: filterUser};
        }
        Model.find(filter)
        .populate('user')
        .exec((error, populated) => {
            if (error) {
                reject(error);
                return false;
            }

            resolve(populated);
        });
    });
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