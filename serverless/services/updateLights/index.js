const mongoose = require("mongoose");
const util = require("util");
const { MONGO_URI = "" } = process.env;

const Users = require("../../models/Users");

const updateLights = async () => {
  try {
    if (!MONGO_URI) {
      throw new Error("Please Supply Mongo URI");
    }
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });

    const users = await Users.updateMany(
      {
        "lights.removeLightAt": { $lt: new Date() },
      },
      { $pull: { lights: { removeLightAt: { $lt: new Date() } } } }
    );

    console.log(util.inspect(users, false, null, true /* enable colors */));
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
