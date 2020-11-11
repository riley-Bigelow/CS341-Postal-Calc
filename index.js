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
  const zone = Number(request.query.zone);
	calculateRate(response, weight,itemtype,zone);
}


function calculateRate(response, weight, type, zone) {
  var cost = 0.00
  if(type == 'Letters(Stamped)'){
    cost = stampedLetters(weight);
  }
  else if(type == "Letters(Metered)"){
    cost = meteredLetters(weight);
  }
  else if(type =="Large Envelopes(Flats)"){
    cost = flats(weight);
  }
  else {
    cost = packages(weight,zone);
  }
  cost = cost.toFixed(2);
  console.log(cost);
  
  if(zone == NaN){
    zone = "Not Applicable";
  }

	// JSON object of the values  to pass  to the EJS result
	const params = {weight: weight, type: type, zone: zone, cost: cost };

	// Render the response, using "result.ejs" in the pages directory
	response.render('pages/result', params);
}

function stampedLetters(weight){
  basePrice = .55;
  increase = .15
  if(weight >= 3.5){
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
  if(weight >= 3.5){
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
  if(weight <= 2){
    return basePrice;
  }
  else{
    basePrice += ((weight-1) * increase)
    return basePrice;
  } 
}

function packages(weight,zone){
  console.log('hitting packages')
  weight = Math.ceil(weight)
  if(weight > 13){
    weight = 13;
  }
  if(weight <= 4){
    basePrice = 3.80
    increase = .05
    if(zone <= 2){
      return basePrice 
    }
    else if(zone <= 7){
      return basePrice += ((zone - 2) * increase) 
    }
    else{
      return basePrice += ((9 - 1) * increase)
    }
  }
  else if (weight <=8){
    basePrice = 4.60
    increase = .05
    if(zone <= 2){
      return basePrice
    }
    else if(zone <= 6){
      return basePrice += ((zone - 2) * increase);  
    }
    else{
      if(zone == 7){
        return basePrice += .30;
      }
      else{
        return basePrice += .40; 
      }
    }
  } 
  else if(weight <= 12){
    let basePrice = 5.30
    let increase = .05
    if(zone <= 2){
      return basePrice
    }
    else if(zone <= 6){
      return basePrice += ((zone - 2) * increase);  
    }
    else{
      if(zone == 7){
        return basePrice += .35;
      }
      else{
        return basePrice += .45; 
      }
    }
  }
  else{
    let basePrice = 5.90
    let increase = .05
    if(zone <= 2){
      return basePrice
    }
    else if(zone == 3){
      return basePrice += .05;  
    }
    else if(zone == 4){
      return basePrice += .15;
    }
    else if (zone == 5){
      return basePrice += .25; 
    }
    else if(zone == 6){
      return basePrice += .30;
    }
    else if (zone == 7){
      return basePrice += .50; 
    }
    else{
      return basePrice += .60;
    }
  }
}

