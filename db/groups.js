const mongoose = require('mongoose');
const {Schema}=mongoose;


//definimos las propiedades de los datos
const groupsSchema=new Schema({
    user:{type: String, required: true},
    phone:{type: Number, required: true},
    idGroup:{type: String, required: true},
    messages:[{name: String, message: String}],
})


module.exports=mongoose.model('GroupsWA', groupsSchema)