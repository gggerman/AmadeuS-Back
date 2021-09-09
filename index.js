const server = require('./src/app.js');
const connectionDB  = require('./src/db.js');
const express = require('express');

// Conexión a DB
connectionDB()

app.set('port', process.env.PORT || 3001);

// Corriendo el servidor
server.listen(app.get('port'), () => {
  console.log(`Server running on port ${app.get('port')}`); // eslint-disable-line no-console
});
