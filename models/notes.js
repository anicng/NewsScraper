const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const notesSchema = new Schema ({
    title: {
        type: String,
    },
    body: {
        type: String,
    }
});

var Notes = mongoose.model("notes", notesSchema);

module.exports = Notes;
