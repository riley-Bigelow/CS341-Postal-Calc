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
  const quant= Number(request.query.itemtype);
	calculateRate(response, weight,itemtype,quant);
}


function calculateRate(response, type, weight, quant) {
  var cost = 0.00
  console(weight + " " + type);
  if(type == 'Letters(Stamped)'){
    cost = stampedLetters(weight, quant);
  }
  else if(type == "Letters(Metered)"){
    cost = meteredLetters(weight, quant);
  }
  else if(type="Large Envelopes(Flats)"){
    cost = flats(weight, quant);
  }
  else{
    cost = packages(weight,quant);
  }

	// JSON object of the values  to pass  to the EJS result
	//const params = {weight: weight, type: type, cost: cost };

	// Render the response, using "result.ejs" in the pages directory
	//response.render('pages/result', params);
}

