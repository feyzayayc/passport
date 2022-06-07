const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    ad: {
        type: 'String',
        require: [true, "Ad alanı boş bırakılamaz"],
        trim: true,
        minLength: 2,
        maxLength: 30
    },
    soyad: {
        type: 'String',
        require: true,
        trim: true,
        minLength: 2,
        maxLength: 30
    },
    email: {
        type: 'String',
        unique: true,
        require: true,
        trim: true,
        lowercase: true
    },
    sifre: {
        type: 'String',
        require: true,
        trim: true
    }
}, {
    collection: 'kullanicilar',
    timestamps: true,
});

const User = mongoose.model('User', UserSchema);

module.exports = User;