const AWS = require('aws-sdk');

AWS.config.update({
  region: 'eu-west-1'
});

const docClient = new AWS.DynamoDB.DocumentClient();
const table = 'ASE2307';

exports.handler = function (event, context) {
  let ID = event.ID;
  let UserID = event.userID;
  let email = event.email;
  let tila = event.tila;


  var params = {
      TableName:table,
      Key:{
          'ID': ID,
          'UserID': UserID
      },
  UpdateExpression: "set Tila = :s",
    ExpressionAttributeValues:{
        ":s": tila
    },
    ReturnValues:"UPDATED_NEW"
};

console.log("Updating the item...");
docClient.update(params, function(err, data) {
    if (err) {
        console.error("Unable to update item. Error JSON:", JSON.stringify(err, null, 2));
    } else {
        console.log("UpdateItem succeeded:", JSON.stringify(data, null, 2));
    }
});
var mailparams = {
  Destination: {
    ToAddresses: [email]
  },
  Message: {
    Body: {
      Text: {
       Charset: "UTF-8",
       Data: "Tikettinne "+ID+" on käsitelty"
      }
     },
     Subject: {
      Charset: 'UTF-8',
      Data: 'Tiketti käsitelty'
     }
    },
  Source: 'esko.immonen@gmail.com',
  ReplyToAddresses: [
     'esko.immonen@gmail.com'
  ],
};

var sendPromise = new AWS.SES({apiVersion: '2010-12-01'}).sendEmail(mailparams).promise();

// Handle promise's fulfilled/rejected states
sendPromise.then(
  function(data) {
    console.log(data.MessageId);
  }).catch(
    function(err) {
    console.error(err, err.stack);
  });
};
