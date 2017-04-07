const http = require('http');
const io = require('socket.io');
const express = require('express');

// ---------------------------------------------------------
// get an instance of the router for api routes
// ---------------------------------------------------------
var apiRoutes = express.Router();

export default function auth({
    app
}) {

    var server = http.Server(app);
    var ioServer = io(server);

    apiRoutes.get('/', function(req, res) {
        res.send('Hello! this is socket service');
    });

    ioServer.on('connection', function(socket){
      ioServer.emit('init',{message:"you have connected"});
      socket.on('chat', function(msg){
        ioServer.emit('chat', msg);
      });
    });

    server.listen(3000);

    return apiRoutes;
}
