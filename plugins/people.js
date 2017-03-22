exports.register = function (server, options, next) {
     server.route({
         method: 'GET',
         path: '/people',
         handler: function (request, reply) {

           let contex = {
                people: [
                  {firstName: "Yehuda", lastName: "Katz"},
                  {firstName: "Carl", lastName: "Lerche"},
                  {firstName: "Alan", lastName: "Johnson"}
                ]
              }

           return reply.view('people', contex);
         }
       });

  return next();
};
exports.register.attributes = {
     name: 'people'
};
