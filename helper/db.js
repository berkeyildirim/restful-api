const mongoose = require('mongoose');

module.exports = () => {
    mongoose.connect('mongodb://berke:berke123@ds253017.mlab.com:53017/heroku_cz6w5x17',{useNewUrlParser:true});
    mongoose.connection.on('open',() => {
        console.log('MongoDB Connected !');
    })
    mongoose.connection.on('eroor',(err) => {
        console.log('MongoDB Error !',err);
    })
    mongoose.Promise = global.Promise;
}