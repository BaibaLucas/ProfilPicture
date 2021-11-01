const express = require('express');
const exphbs = require('express-handlebars');
const fileUpload = require('express-fileupload');

const app = express();
const port = process.env.PORT || 3000;

// default option
app.use(fileUpload());

// Templating engine
app.engine('hbs', exphbs({ extname: '.hbs' }));
app.set('view engine', 'hbs');


app.get('', (req, res) => {
  res.render('index');
});



app.listen(port, () => console.log(`Listening on port ${port}`));