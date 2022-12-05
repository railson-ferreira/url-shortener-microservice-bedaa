require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser')
const app = express();

app.use(bodyParser.urlencoded({ extended: false }))

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
app.post('/api/shorturl',function(req, res) {
    const originalUrl =req.body.url;
  try{
    if(originalUrl && !originalUrl.includes("https://")){
      res.json({ error: 'invalid url' })
      return;
    }
  }catch (_){
    res.json({ error: 'invalid url' })
    return;
  }
  res.json({ original_url:originalUrl, short_url : btoa(originalUrl)});
});


// Your first API endpoint
app.get('/api/shorturl/:shortId', function(req, res) {
  const originalUrl = atob(req.params.shortId)
  res.redirect(originalUrl)
});

module.exports = app