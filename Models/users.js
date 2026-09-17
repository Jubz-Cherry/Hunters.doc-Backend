const mongoose = require ("mongoose");

const userSchema = new mongoose.Schema({
    name: { type: String, trim: true, required: true },
    email: { type: String, unique: true, lowercase: true, trim: true, required: true },
    bio: { type: String, default: 'Saving people, hunting things, the family business.', maxlength: 280 },
    senha: { type: String, required: true },

    resetPasswordToken: {
        type: String,
        default: null
},

    resetPasswordExpires: {
        type: Date,
        default: null
}
});

module.exports = mongoose.model("User", userSchema);
