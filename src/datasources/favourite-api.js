const { MongoDataSource } = require("apollo-datasource-mongodb")

class FavouriteAPI extends MongoDataSource {
  async getFavourite(email) {
    const resp = await this.findByFields({
      email
    })
    return resp[0]
  }
  async updateFavourite(email, favourites) {
    // find based on email and add if user doesn't exist
    const resp = await this.collection.updateOne({ email },{
      $set: {
        email,
        favourites
      }
    }, { upsert: true })
    return resp
  }
}

module.exports = FavouriteAPI