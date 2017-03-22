exports.register = function (server, options, next) {
    server.route({ path: '/',
        method: 'GET',
        config: {
          auth: false,
          handler: function(request, reply) {
            reply.view("index");
          }
        }
      });

    return next();
};
exports.register.attributes = {
     name: 'landing'
};
