require('dotenv').config();
const { DB_URI } = process.env;

const mongoose = require('mongoose')

let connectionDB = () => {
  mongoose.connect('mongodb+srv://equipo16:vamoslospibes@cluster0.5doep.mongodb.net/ecommerce?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  mongoose.connection.on('open', _ => {
    console.log('Database connected')
  })
  mongoose.connection.on('error', err => {
    console.log(err)
  })

    // .then(()=> console.log('Database connected'))
    // .catch(err => console.log(err))
}

module.exports = connectionDB
