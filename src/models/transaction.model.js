const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    senderAccount: { type: Number },
    receiverAccount: { type: Number },
    transAmount: { type: Number },
}, { timestamps: true });

schema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
        // delete ret.id;
        delete ret.updatedAt;
    }
});

module.exports = mongoose.model('Transaction', schema);
