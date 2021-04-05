  
const functions = require('firebase-functions');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser')
const crypto = require('crypto');
const squareConnect = require('square-connect');
const dotenv = require('dotenv');
dotenv.config();
const { v4: uuidv4 } = require('uuid');
const accessToken = process.env.ACCESS_TOKEN

const app = express();

app.use(cors({
  origin: true
}));

//app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({ extended: false }));
//app.use(express.static(__dirname));


app.use(express.json())



// Set Square Connect credentials and environment
const defaultClient = squareConnect.ApiClient.instance;

// Configure OAuth2 access token for authorization: oauth2
const oauth2 = defaultClient.authentications['oauth2'];
oauth2.accessToken = accessToken;

// Set 'basePath' to switch between sandbox env and production env
// sandbox: https://connect.squareupsandbox.com
// production: https://connect.squareup.com
defaultClient.basePath = 'https://connect.squareup.com';

app.post('/process-payment', async (req, res) => {
  const request_params = req.body;
  console.log('request_params', request_params)

  // length of idempotency_key should be less than 45
  const idempotency_key = uuidv4();

  // Charge the customer's card
  const payments_api = new squareConnect.PaymentsApi();


  const request_body = {
    source_id: request_params.nonce,
    amount_money: {
      amount: 100, // $1.00 charge
      currency: 'USD'
    },
    location_id: request_params.location_id,
    idempotency_key: idempotency_key,
    verificationToken: request_params.token  // ADD this line
  };

  try {
    const response = await payments_api.createPayment(request_body);
    res.status(200).json({
      'title': 'Payment Successful',
      'result': response
    });
  } catch(error) {
    console.log(error.text)
    res.status(500).json({
      'title': 'Payment Failure',
      'result': error.response.text
    });
  }
});

app.get('*', (req, res) => {
  
    res 
        .status(404)
        .send('404, page not found.')
        
});

exports.api = functions.https.onRequest(app);
