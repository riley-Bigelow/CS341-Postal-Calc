const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
//var mathmodel=require('models/mathmodel');

//where static files live
app.use(express.static(__dirname + '/public'));

// view directory for all files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');


// rule requesting "/rates" should be handled by the
app.get('/rates', handleRates);

// start the server listening
app.listen(port, function() {
  console.log('Node app is running on port', port);
});

function handleRates(request, response) {
	const weight = parseFloat(request.query.weight);
  const itemtype = request.query.itemtype;
	calculateRate(response, weight,itemtype);
}


function calculateRate(response, weight, type) {
  var cost = 0.00
  if(type == 'Letters(Stamped)'){
    cost = stampedLetters(weight);
  }
  else if(type == "Letters(Metered)"){
    cost = meteredLetters(weight);
  }
  else if(type="Large Envelopes(Flats)"){
    cost = flats(weight);
  }
  else{
    cost = packages(weight);
  }
  cost = cost.toFixed(2);
  console.log(cost);
  

	// JSON object of the values  to pass  to the EJS result
	//const params = {weight: weight, type: type, cost: cost };

	// Render the response, using "result.ejs" in the pages directory
	//response.render('pages/result', params);
}

function stampedLetters(weight){
  basePrice = .55;
  increase = .15
  if(weight > 3.5){
    return 1.00;
  }
  else {
   weight=  Math.ceil(weight)
    basePrice += ((weight -1) * increase)
    return basePrice;
  }
}

function meteredLetters(weight){
  basePrice = .50;
  increase = .15
  if(weight > 3.5){
    return .95;
  }
  else {
    weight=  Math.ceil(weight)
    basePrice += ((weight -1) * increase)
    return basePrice;
  }
}

function flats(weight){
  basePrice = 1.00;
  increase = .20
  weight = Math.ceil(weight)
  if(weight > 13){
    weight = 13;
  }
  if(weight < 2){
    return basePrice;
  }
  else{
    basePrice += ((weight-1) * increase)
    return basePrice;
  } 
}

