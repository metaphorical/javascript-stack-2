
const http = require('http');
const koa = require('koa');
const koaRouter = require('koa-router');
const serve = require('koa-static');
const views = require('koa-views');

const createSocketServer = require('./server/sockets.js');



const app = koa();
const router = koaRouter();

app.use(serve('./build'));


app.use(views(__dirname +'/ui/templates',{
  map: {
    jade: 'jade'
  },
  extension: 'jade'
} ));



/**
 * Routes can go both before and after but
 * app.use(router(app)); must be before
 */
router.get('/', function *() {
  console.log(__dirname +'/ui/templates');
  console.log('bha');
  yield this.render('layout', {  });
});

app
  .use(router.routes())
  .use(router.allowedMethods());

/**
 * To be able to attach Socket.io to server instance, we need app to create callback
 * that can be used by http server instance.
 *
 * Up to this point all app.use stuff must be done (middlewares, routes...)
 */
var server = http.Server(app.callback());

/**
 * Passing server instance to socket.io instance
 */

createSocketServer(server);


// Start the server
server.listen(9090);
console.info('Now running on localhost:9090');