const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const JournalSchema = new Schema ({
    user : {
        type : Schema.ObjectId,
        ref : 'User'

    },
    title :{
        type :String ,
        required : true ,
         
    },
    body :{
        type :String ,
        required : true ,
         
    },


    date:{
        type :Date ,
        required : true ,

    },
    createdAt :{
        type :Date ,
        default : Date.now() 
         
    },
    updatedAt :{
        type :Date ,
        default : Date.now() 
         
    }

});

module.exports = mongoose.model('Journal', JournalSchema);
