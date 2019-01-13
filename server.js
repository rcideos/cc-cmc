'use strict';
var express  = require('express');
var app      = express();         
var request = require('request');
var bodyParser = require('body-parser');

app.use(function(req, res, next) { //allow cross origin requests
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "POST, PUT, OPTIONS, DELETE, GET");
    res.header("Access-Control-Max-Age", "3600");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
    next();
}); 

// configuration
app.use(express.static(__dirname + '/public'));               
app.use('/public/uploads',express.static(__dirname + '/public/uploads'));

app.use(bodyParser.urlencoded({'extended':'true'}));            
app.use(bodyParser.json());                                    
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); 

app.get('/', function (req, res) {
  res.sendfile('./index.html')
})

app.get('/api/getCoin', function(req, res) {
    var options = { method: 'GET',
      url: 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?limit=2102', 
	  headers: 
      { 
        'cache-control': 'no-cache',
        'x-cmc_pro_api_key': '91ce7f20-b15b-4ac0-953d-26eb646f7fc3'  
      } 
    };
    request(options, function (error, response, body) {
       if (error) throw new Error(error);
       res.send(body);
    });
});


app.listen(3000);
console.log("port is 3000");
