process.env.NODE_ENV = 'development';
process.env.NODE_APP_INSTANCE = 'development';
var restify = require('restify');
var bodyParser = require('body-parser');
var port = 8080;

var app = restify.createServer();

app.use(restify.queryParser());
app.use(bodyParser.json());
restify.CORS.ALLOW_HEADERS.push('authorization');
restify.CORS.ALLOW_HEADERS.push('test');
app.use(restify.CORS());
app.use(restify.fullResponse());


require('./routes/repos')(app);

app.listen(port, function () {
	console.log('Server is listening on http://localhost:' + port);
});
