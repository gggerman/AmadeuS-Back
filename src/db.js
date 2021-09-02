require('dotenv').config();
const { DB_URI } = process.env;

const mongoose = require('mongoose')

let connectionDB = () => {
  mongoose.connect(DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }) 
    .then(()=> console.log('Database connected'))
    .catch(err => console.log(err))
} 

module.exports = connectionDB


