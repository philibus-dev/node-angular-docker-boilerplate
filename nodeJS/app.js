const createError = require('http-errors'),
	express = require('express'),
	path = require('path'),
	cookieParser = require('cookie-parser'),
	logger = require('morgan'),
	{ auth } = require('express-openid-connect'),
	cors = require('cors');

const indexRouter = require('./routes/index'),
	apiRouter = require('./routes/api');

const app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

const config = {
	authRequired: false,
	auth0Logout: true,
	baseURL: process.env.AUTHO_BASE_URL,
	clientID: process.env.AUTHO_CLIENT_ID,
	issuerBaseURL: process.env.AUTHO_DOMAIN,
	secret: process.env.AUTHO_SECRET
};

// auth router attaches /login, /logout, and /callback routes to the baseURL
app.use(auth(config));

const allowedOrigins = [process.env.AUTHO_DOMAIN, 'http://localhost:4200', 'http://localhost:8080', 'http://localhost'];
app.use(cors({
	origin: function(origin, callback){
		if(!origin) return callback(null, true);
		if(allowedOrigins.indexOf(origin) === -1){
			const msg = 'The CORS policy for this site does not allow access from the specified Origin ' + origin;
			return callback(new Error(msg), false);
		}
		return callback(null, true);
	}

}));

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api', apiRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
	next(createError(404));
});

// error handler
app.use(function (err, req, res) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.render('error');
});

module.exports = app;
