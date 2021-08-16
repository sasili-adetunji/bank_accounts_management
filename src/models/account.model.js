const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    email: { type: String, match: [/.+\@.+\..+/, 'Please fill a valid email address'], required: true },
    accountNumber: { type: Number, match: [/d{10}/, 'Account Number is not a valid 10 digit number!'], required: true },
    createdDate: { type: Date, default: Date.now }
});

schema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
        delete ret.hash;
    }
});

module.exports = mongoose.model('Account', schema);
