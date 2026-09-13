const mongoose = require ("mongoose");

const userSchema = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true },
    senha: String,

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