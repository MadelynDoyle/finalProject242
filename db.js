const mongoose = require("mongoose");

const startMongo = async () => {
  mongoose
    .connect(
      "mongodb+srv://doylemr:tr3D7lUfsErph7se@cluster0.afz2cbd.mongodb.net/?retryWrites=true&w=majority"
    )
    .then(() => {
      console.log("Connected to mongodb");
    })
    .catch((error) => console.log("Couldn't connect to mongodb", error));
};

module.exports = startMongo;