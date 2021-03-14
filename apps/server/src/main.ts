// EXPRESS SERVER PROXY TO TD AMETRADE API
// 127.0.0.1:3000

const app = require('./app/server').default;

const port = process.env.port || 8080;

var server = require('http').Server(app);

server.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});

server.on('error', console.error);

console.log("  Press CTRL-C to stop\n");
