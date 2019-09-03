const mongoose = require('mongoose');
const schema = mongoose.Schema;

const UsersSchema = new schema({
    username:{
        type:String,
        require:true,
        unique:true
    },
    password:String,
    position:String,
    departmant:String,
    birthday:Number,
    phone:Number,
    date:{
        type:Date,
        default:Date.now
    }
     
});

module.exports = mongoose.model('users', UsersSchema);