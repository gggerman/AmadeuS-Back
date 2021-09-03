const server = require('./src/app.js');
const connectionDB  = require('./src/db.js');

// Conexión a DB
connectionDB()

// Corriendo el servidor
server.listen(3000, () => {
  console.log(`Server running on port 3000`); // eslint-disable-line no-console
});
