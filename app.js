const express = require('express');
const exphbs = require('express-handlebars');
const fileUpload = require('express-fileupload');

const app = express();
const port = process.env.PORT || 3000;

// default option
app.use(fileUpload());

// Static folder
app.use(express.static('public'));
app.use(express.static('upload'));

// Templating engine
app.engine('hbs', exphbs({ extname: '.hbs' }));
app.set('view engine', 'hbs');


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