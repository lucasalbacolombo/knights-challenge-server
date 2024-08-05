const mongoose = require("mongoose");

async function connect() {
  try {
    const dbConnection = await mongoose.connect(
      "mongodb://mongodb:27017/KnightServerDB"
    );

    console.log("Connect to DB:", dbConnection.connections[0].name);
  } catch (err) {
    console.log("Connection error", err);
  }
}

module.exports = connect;
