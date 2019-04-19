const mongoose = require('mongoose')
mongoose.connect('mongodb://reactChatAdmin:admin0018@ds123196.mlab.com:23196/react-chat-app',{useNewUrlParser: true})

const userSchema = mongoose.Schema({
    'username':String,
    'password':String,
    'isOnline':Boolean
})

const database = mongoose.model('chat-user-details', userSchema);
module.exports.database = database

module.exports.getUsernameByUsername = (user, callback) =>{
    const query = {username: user}
    database.find(query,callback)
}

module.exports.getLoginDetails = (user,pass,callback) =>{
    const query = {$and: [{username: user}, {password: pass}]};
    database.find(query,callback)
}
