const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_CONNECTION_STRING)
    .then(() => { console.log('db connection') })
    .catch((err) => { console.log(err) })