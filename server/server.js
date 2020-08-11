require('rootpath')();
const express = require('express');
var path = require("path");
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const errorHandler = require('_middleware/error-handler');
const morgan = require('morgan');

app.use(morgan('tiny'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

// allow cors requests from any origin and with credentials
app.use(cors({ origin: (origin, callback) => callback(null, true), credentials: true }));

// api routes
app.use('/accounts', require('./accounts/accounts.controller'));
app.use('/doctors',require('./doctors/accounts.controller'))


app.use(express.static(path.join(__dirname, "./public")));
app.use("/hospital", require("./routes/hospitalRoute"))
  app.use("/doctor", require("./routes/doctorRoute"));
  app.use("/appointment", require("./routes/appointmentRoute"));
  app.use("/rating", require("./routes/ratingRoute"));
  app.use("/speciality",require("./routes/specialityRoute"));
  app.use("/location",require('./routes/locationRoute'));

// global error handler
app.use(errorHandler);

// start server
const port = process.env.NODE_ENV === 'production' ? (process.env.PORT || 80) : 4000;
app.listen(port, () => {
    console.log('Server listening on port ' + port);
});
