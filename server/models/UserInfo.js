const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserInfoSchema = new Schema({
    user: { 
        type: Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
    year: { 
        type: String, 
        required: false 
    },
    bio: { 
        type: String, 
        required: false 
    },
});

module.exports = mongoose.model('UserInfo', UserInfoSchema);
