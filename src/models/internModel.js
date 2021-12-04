const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId

const internSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: {
        type: String,
        validate: {
            validator: function (email) {
                return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)
            }, message: 'Please fill a valid email address', isAsync: false,
            unique: true, required: true
        }
    },
    mobile: {
        type: Number,
        validate: {
            validator: function (mobile) {
                return /^(\+\d{1,3}[- ]?)?\d{10}$/.test(mobile)
            }, message: 'Please fill a valid mobile number', isAsync: false, required: true, unique: true
        }
    },
    collegeId: {
        type: ObjectId,
        ref: 'College',
        required:true
    },
    isDeleted: { type: Boolean, default: false }

}, { timestamps: true })

module.exports = mongoose.model('Intern', internSchema)