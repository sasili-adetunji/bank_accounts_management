const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    accountNumber: { type: Number, match: [/d{10}/, 'Account Number is not a valid 10 digit number!'], required: true },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
}, { timestamps: true });

schema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
        delete ret.id;
        delete ret.createdAt;
        delete ret.updatedAt;
    }
});

module.exports = mongoose.model('Account', schema);
