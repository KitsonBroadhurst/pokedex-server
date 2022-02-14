const mongoose = require("mongoose")

const FavouriteSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  favourites: {
    type: [Number],
    required: true
  }
}, { strict: false })

module.exports = Favourite = mongoose.model('favourites', FavouriteSchema)