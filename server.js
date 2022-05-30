const express = require('express')
const path = require("path");
const { logger } = require('./middleware/logEvents')
const errorHandler = require('./middleware/errorHandler')

// Config
const app = express()
const PORT = process.env.PORT || 3500

// custom middleware logger
app.use(logger);

// built-in middleware to handle urlencoded form data
app.use(express.urlencoded({ extended: false }));

// built-in middleware for json 
app.use(express.json());

//serve static files
app.use('/', express.static(path.join(__dirname, '/public')));
app.use('/subdir', express.static(path.join(__dirname, '/public')));

//routes
app.use('/', require('./routes/root'))
app.use('/subdir', require('./routes/subdir'))
app.use('/register', require('./routes/api/register'))
app.use('/auth', require('./routes/api/auth'))
app.use('/employees', require('./routes/api/employees'))

app.all('*', (req, res) => {
  res.status(404)
  if (req.accepts('html')){
    res.sendFile(path.join(__dirname,'views','404.html'))
  }else if (req.accepts('json')){
    res.json({error : "404 not found"})
  } else {
    res.type('txt').send("404 not found")
  }
});

app.use(errorHandler)

app.listen(PORT, () => console.log(`server running on port ${PORT}`));
