const server = require('./src/app.js');
const connectionDB  = require('./src/db.js');

// Conexión a DB
connectionDB()

// Corriendo el servidor
server.listen(process.env.PORT || 3001, () => {
  console.log(`Server running on port 3001`); // eslint-disable-line no-console
});
