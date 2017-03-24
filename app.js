'use strict';

const Hapi = require('hapi');

console.log(`port = ${process.env.PORT}`);

var process_port = process.env.PORT || 8080;

const server = new Hapi.Server();
server.connection({ port: process_port, host: '172.31.13.194' });
//server.connection({ port: process_port, host: 'localhost' });

server.register(require('inert'), (err) => {

    if (err) {
        throw err;
    }
    
    server.route({
        method: 'GET',
        path: '/{param*}',
        handler: {
            directory: {
                path: '.',
                redirectToSlash: true,
                index: true
            }
        }
    });

    server.route({
        method: 'GET',
        path: '/',
        handler: function (request, reply) {
            reply.file('./public/index.html');
        }
    });
//
//	server.route({
//		method: 'GET',
//		path: '/hello/1',
//		handler: function (request, reply) {
//			reply('Hello, world!');
//		}
//	});
//    
//    server.route({
//        method: 'GET',
//        path: '/img/{filename}',
//        handler: {
//            file: function (request) {
//                return '/img/' + request.params.filename;
//            }
//        }
//    });

//	server.route({
//		method: 'GET',
//		path: '/{name}',
//		handler: function (request, reply) {
//			reply('Hello, ' + encodeURIComponent(request.params.name) + '!');
//		}
//	});


});



server.start((err) => {

    if (err) {
        throw err;
    }
    console.log(`Server running at: ${server.info.uri}`);
});