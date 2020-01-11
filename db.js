const url = 'mongodb+srv://pcs:jLptKk7vNy0BXGpb@pcs-bmxwt.mongodb.net/pcs?retryWrites=true&w=majority';
const mongoose = require('mongoose');
// Connecting to the database


const mongooseClient = (callback) => {
  mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }).then((client) => {
    console.log('Successfully Connected to the database');
  }).catch((err) => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
  });
};


module.exports = {
  connect: mongooseClient,
};
