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
                return  /^\+?([0-9]{2})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/.test(mobile)
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