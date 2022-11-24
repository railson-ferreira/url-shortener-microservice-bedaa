require('dotenv').config();
const express = require('express');
const cors = require('cors');
var bodyParser = require('body-parser')
const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());

app.use('/public', express.static(`${__dirname.replace("api", "") }/public`));

app.get('/', function(req, res) {
  res.sendFile(__dirname.replace("api", "") + '/views/index.html');
});

// Your first API endpoint
app.get('/api/hello', function(req, res) {
  res.json({ greeting: 'hello API' });
});


// Your first API endpoint
app.post('/api/shorturl', function(req, res) {
    const originalUrl =req.body.url;
  try{
    if(!originalUrl.includes("http://")){
      res.json({ error: 'invalid url' })
      return;
    }
  }catch (_){
    res.json({ error: 'invalid url' })
    return;
  }
  res.json({ original_url:originalUrl, short_url : btoa(originalUrl)});
  throw JSON.stringify({ original_url:originalUrl, short_url : btoa(originalUrl)})
});


// Your first API endpoint
app.get('/api/shorturl/:shortId', function(req, res) {
  const originalUrl = atob(req.params.shortId);
  res.redirect(originalUrl)
});

module.exports = app