const mongoose = require("mongoose");
const util = require("util");
const { MONGO_URI = "" } = process.env;

const updateLights = async () => {
  try {
    if (!MONGO_URI) {
      throw new Error("Please Supply Mongo URL");
    }
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });

    // console.log(util.inspect('name of the variable', false, null, true /* enable colors */));
    return true;
  } catch (error) {
    console.error(error);
    throw new Error(
      `updateLights - ERROR: \n ${error.message || error.reason}`
    );
    process.exit(1);
  }
};

module.exports.updateLights = updateLights;
