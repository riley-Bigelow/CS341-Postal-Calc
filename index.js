const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
//var mathmodel=require('models/mathmodel');

//where static files live
app.use(express.static(__dirname + '/public'));

// view directory for all files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');


// rule requesting "/math" should be handled by the
// handleMath in model js 
app.get('/rates', handleRates);

// start the server listening
app.listen(port, function() {
  console.log('Node app is running on port', port);
});

function handleRates(request, response) {
	/*const operation = request.query.operation;
	const operand1 = Number(request.query.operand1);
	const operand2 = Number(request.query.operand2);
	calculateRate(response, operation, operand1, operand2);*/
}


function calculateRate(response, type, weight) {
	op = op.toLowerCase();


	/*// JSON object of the values  to pass  to the EJS result
	const params = {operation: op, left: left, right: right, result: result};

	// Render the response, using "result.ejs" in the pages directory
	response.render('pages/result', params);*/
}

