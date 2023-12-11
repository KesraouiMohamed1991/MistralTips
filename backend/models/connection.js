const mongoose = require('mongoose');

const connectionString = 'mongodb+srv://kesraoui15003:harlembynight@cluster0.unytmwf.mongodb.net/MarseilleSips'

mongoose.connect(connectionString, { connectTimeoutMS: 2000 })
  .then(() => console.log('Database connected'))
  .catch(error => console.error(error));
