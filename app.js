require('dotenv').config();
const express = require('express');
const exphbs = require('express-handlebars');
const fileUpload = require('express-fileupload');
const mysql = require('mysql2');

const app = express();
const port = process.env.PORT || 3001;

// default option
app.use(fileUpload());

// Static folder
app.use(express.static('public'));
app.use(express.static('upload'));

// Templating engine
app.engine('hbs', exphbs({ extname: '.hbs' }));
app.set('view engine', 'hbs');


// Connection Pool DB (We can secure with .env for futur)
// https://stackoverflow.com/questions/50093144/mysql-8-0-client-does-not-support-authentication-protocol-requested-by-server for mysql2*

const pool = mysql.createPool({
  connectionLimit : 10,
  host : process.env.HOST,
  user : process.env.USR,
  password : process.env.PASSWORD,
  database : process.env.DB
});

pool.getConnection((err, connection) =>{
  if(err) throw err ;
  console.log('Connected!');
});


app.get('', (req, res) => {
  res.render('index');
});

app.post('', (req, res) => {
  let sampleFile;
  let uploadPath;

  if(!req.files || Object.keys(req.files).length === 0){
    return res.status(400).send('No files were uploaded.');
  }

  // name of the input is sampleFile
  sampleFile = req.files.sampleFile;
  uploadPath = __dirname + '/upload/' + sampleFile.name;


  console.log(sampleFile);

  // Use mv() to place file on the server
  sampleFile.mv(uploadPath, function(err) {
    if(err) return res.status(500).send(err);

    res.send('File uploaded!');

  });

});



app.listen(port, () => console.log(`Listening on port ${port}`));