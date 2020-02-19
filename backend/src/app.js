const express = require('express');
const app = express();

const sequelize = require('./settings/sequelize')

const path = require('path')

const adminRoute = require('./routes/adminRoute')
const contestRoute = require('./routes/contestRoute')
const videoRoute = require('./routes/videoRouter')

const port = process.env.PORT || 8080

app.use(express.json())

var cors = require('cors');
app.use(cors({
  origin: ['http://localhost:8080', 'http://127.0.0.1:8080', 'http://172.24.42.62:8080'],
  credentials: true
}));

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', "*");
  res.header('Access-Control-Allow-Headers', true);
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  next();
});

//sequelize.sync({force:true})
//sequelize.sync({alter: true})
sequelize.sync()

const publicDirectoryPath = path.join(__dirname, '../resources')
app.use('/resources', express.static(publicDirectoryPath))

app.use('/', videoRoute)
app.use('/admin', adminRoute)
app.use('/contest', contestRoute)

app.listen(port, (err, result) => {
    console.log('Server is running');
});
