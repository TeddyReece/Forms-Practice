var express = require('express')
var app = express()
var bodyParser = require('body-parser')
var fs = require('fs')
app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({ extended: false}))

app.get('/', function (request, response){
  response.render('index')
})
app.get('/create', function(request, response){
  response.render('create')
})
app.get('/display', function(request, response){
  var rawFile = fs.readFileSync('data.json')
  var teamUpdates = {
    data: JSON.parse(rawFile)
  }
  response.render('display', teamUpdates)
})

app.post('/your-team', function (request, response){
  let responses = request.body
  var teamUpdates = undefined
  var rawFile = fs.readFileSync('data.json')
  var teamUpdates = JSON.parse(rawFile)
  teamUpdates.push(responses)
  fs.writeFileSync('data.json', JSON.stringify(teamUpdates))
  response.render('your-team', responses)
})


app.listen(process.argv[2], function (){
  console.log(`listening on ${process.argv[2]}`)
})
