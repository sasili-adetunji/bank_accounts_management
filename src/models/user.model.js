const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    email: { type: String, unique: true, match: [/.+\@.+\..+/, 'Please fill a valid email address'], required: true },
    hash: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    // account: [{ type: Schema.Types.ObjectId, ref: 'Account', required: true }],
}, { timestamps: true });

schema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
        delete ret.id;
        delete ret.hash;
        delete ret.createdAt;
        delete ret.updatedAt;
    }
});


module.exports = mongoose.model('User', schema);
