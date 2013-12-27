/**
 * Module dependencies.
 */

var express = require('express')
    , routes = require('./routes')
    , http = require('http')
    , path = require('path');

var app = express();

var Mongoose = require('mongoose');
var db = Mongoose.createConnection('localhost', 'kaiju');

var KaijuSchema = require('./models/schema.js').KaijuSchema;
var kaijuMod = db.model('kaiju', KaijuSchema);

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser({uploadDir: __dirname + "/tmp"})); //{autoFiles: true, uploadDir: __dirname + "/tmp" }
app.use(express.methodOverride());
app.use(express.static(path.join(__dirname, 'public')));
app.use(app.router);
app.use(function(err, req, res, next){
    console.error(err.stack);
    res.send(500, 'Something broke!');
});
app.use(function(req, res, next){
    res.send(404, 'Sorry cant find that!');
});

// development only
if ('development' == app.get('env')) {
    app.use(express.errorHandler());
}

//routes
app.get('/', routes.index);
app.get('/partials/:name', routes.partials);
app.get('/directives/:name', routes.directiveSnippet);
app.get('/api/kaijus.json', routes.getKaijus(kaijuMod));
app.get('/api/kaiju', routes.getKaiju(kaijuMod));
//app.get('/404', routes.error);
app.get('/*', routes.index);

app.post('/api/kaiju.json', routes.addKaiju(kaijuMod));

var fs = require('fs');
app.post('/api/image', routes.addImage(fs));
app.post('/api/svg', routes.addSVG(fs));

http.createServer(app).listen(app.get('port'), function(){
    console.log('Express server listening on port ' + app.get('port'));
});