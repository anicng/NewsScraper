const mongoose = require("mongoose");

// Save a reference to the Schema constructor
const Schema = mongoose.Schema;

// Using the Schema constructor, create a new UserSchema object
const articleSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    link: {
        type: String,
        requireed: true
    },
    note: {
        type: Schema.Types.ObjectId,
        ref: "notes"
    }
});

// This creates our model from the above schema, using mongoose's model method
var article = mongoose.model("article", articleSchema);

// Export the Article model
module.exports = article;