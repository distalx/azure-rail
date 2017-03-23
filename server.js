const Hapi = require('hapi');
const Path = require('path');
const PrerenderPlugin = require('hapi-prerender');

const Landing = require('./plugins/landing.js');
const People = require('./plugins/people.js');

const options = {
  connections: {
      routes: {
          files: {
              relativeTo: Path.join(__dirname, 'public')
          }
      }
  }
};

const server = new Hapi.Server(options);

var plugins = [
  { register: Landing, options: {} },
  { register: People, options: {} },
  { register: PrerenderPlugin, options: { token: process.env.PRERENDER_TOKEN } }
  require('inert'),  // serve static content
  require('vision')  // views

]

server.connection({ port: 8000, host: '127.0.0.1' });

server.register(plugins, (err) =>  {

  server.views({
    engines: {
      html: require('handlebars')
    },

    path: Path.join(__dirname, 'templates')

  });

  server.route({
    method: 'GET',
    path: '/public/{param*}',
    handler: {
      directory: {
        path: Path.join(__dirname, 'public'),
        listing: true
        // index: true
      }
    }
  });

  server.start((err) => {
     if(err) {
       throw err;
     }

     console.log(`\x1b[32m Server running at \x1b[34m\x1b[4m${server.info.uri}\x1b[32m`)

  });

});

exports.server = server;
