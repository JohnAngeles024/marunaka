const cors = require("cors");
const exp = require("express");
const bp = require("body-parser");
const passport = require("passport");
const { connect } = require("mongoose");
const { success, error } = require("consola");
const path = require('path');
const router = require('./routes/users');

// Bring in the app constants
const { DB, PORT } = require("./config");

// Initialize the application
const app = exp();

// Middlewares
app.use(cors());
app.use(bp.json());
app.use(passport.initialize());

require("./middlewares/passport")(passport);


// User Router Middleware
app.use("/api/users", require("./routes/users"));

app.get('/', (req, res) => {
  let title = 'Marunaka Imaging System'
  res.render('index', {
      title: title
  })
})


app.get('/user', (req,res)=>{
  res.render('userdashboard');
})

app.get('/admin', (req,res)=>{
  res.render('admindashboard');
})


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(exp.static('public'));

const startApp = async () => {
  try {
    // Connection With DB
    await connect(DB, {
      useFindAndModify: true,
      useUnifiedTopology: true,
      useNewUrlParser: true
    });

    success({
      message: `Successfully connected with the Database \n${DB}`,
      badge: true
    });

    // Start Listenting for the server on PORT
    app.listen(PORT, () =>
      success({ message: `Server started on PORT ${PORT}`, badge: true })
    );
   
  } catch (err) {
    error({
      message: `Unable to connect with Database \n${err}`,
      badge: true
    });
    startApp();
  }
};

startApp();
