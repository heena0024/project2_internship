const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId

const internSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: {
        type: String,
        validate: {
            validator: function(email) {
                return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)
            },
            message: 'Please fill a valid email address',
            isAsync: false,
            required: true,
            unique: true
        }
    },
    mobile: {
        type: String,
        trim:true,
        validate: {
            validator: function(mobile) {
                return  /^([+][9][1]|[9][1]|[0]){0,1}([7-9]{1})([0-9]{9})$/.test(mobile)
            },
            message: 'Please fill a valid mobile number',
            isAsync: false,
            required: true,
            unique: true
        }
    },
    collegeId: {
        type: ObjectId,
        ref: 'College'
    },
    isDeleted: { type: Boolean, default: false }

}, { timestamps: true })

module.exports = mongoose.model('Intern', internSchema)