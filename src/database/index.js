const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

exports.connect = async ({ DB_NAME, DB_HOST }) => {
  return new Promise((resolve, reject) => {
    mongoose.connect(
      DB_HOST,
      {
        useNewUrlParser: true,
        dbName: DB_NAME
      }
    );
    const connection = mongoose.connection;
    connection.on("error", reject);
    connection.on("open", resolve);
  });
};
