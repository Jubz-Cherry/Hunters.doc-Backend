const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema({
    titulo: {
        type: String,
        required: true
    },

    conteudo: {
        type: String,
        required: true
    },

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true
    }
});

module.exports = mongoose.model("notes", noteSchema);