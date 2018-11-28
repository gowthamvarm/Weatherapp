const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const algebra = require('algebra.js');


var Fraction = algebra.Fraction;
var Expression = algebra.Expression;
var Equation = algebra.Equation;

const app = express()

const apiKey = 'd75576f777ccd2e4da987c77157a631a';

console.log('weather application just started');

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs')

app.get('/', function (req, res) {
  res.render('index', {weather: null, error: null});
})

app.post('/', function (req, res) {
  let city = req.body.city;
  let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`

  request(url, function (err, response, body) {
    if(err){
      res.render('index', {weather: null, error: 'Error, please try again'});
    } else {
      let weather = JSON.parse(body)
      if(weather.main == undefined){
        res.render('index', {weather: null, error: 'Error, please try again undefined place'});
      } else {

        var f = `${weather.main.temp}`;

         var deg = ( f - 32) * 5/9 ;
         deg = deg.toFixed(2);

        let weatherText = `It's ${weather.main.temp} °F and ${deg} °C Location : ${weather.name}!`;
        res.render('index', {weather: weatherText, error: null});

      }
    }
  });
})




const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening on port ${port}....` ));

// app.listen(3000, function () {
//   console.log('listening on port 3000!')
// })
