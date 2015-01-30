'use strict';

/*if (process.env.SERVER_ENV && process.env.SERVER_ENV !== "local") {
require('newrelic');
}*/

var express = require('express'),
    app = express(),
    colors = require('colors');

    //Log colors for terminal :)
    colors.setTheme({
      silly: 'rainbow',
      input: 'green',
      verbose: 'cyan',
      prompt: 'grey',
      info: 'grey',
      data: 'grey',
      help: 'cyan',
      warn: 'yellow',
      debug: 'blue',
      error: 'red'
    });

app.get('/*', function (req, res) {
  res.status(200);
  res.set('Content-Type', 'text/plain');
  res.send(function(){
    var returnVal;
    returnVal = "id = 1 ; " + "rnd = " + Math.random();
    return returnVal;
  }());
})

var server = app.listen(3002, function () {

  var host = server.address().address,
      port = server.address().port;

  console.log('ticker app listening at http://%s:%s', host, port);

});


//global exception catcher for uncaught exceptions
process.on('uncaughtException', function(err) {
  console.log('Caught exception: ' + err);
});
