const app = require('./app')
require('./connection');

async function init() {
    await app.listen(8080);
    console.log('Server on localhost:8080')
}

init();