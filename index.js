const app = require('./src/app')
require('./src/connection');

async function init() {
    await app.listen(8080);
    console.log('Server on localhost:8080')
}

init();